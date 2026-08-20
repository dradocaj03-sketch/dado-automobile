const admin = require("firebase-admin");
const Anthropic = require("@anthropic-ai/sdk");

if (!admin.apps.length) {
  // verifyIdToken() braucht keine Credentials (prüft nur die Signatur gegen Googles
  // öffentliche Zertifikate), aber admin.firestore() für den Rate-Limit-Zähler schon -
  // deshalb hier ein echtes Service-Account-Zertifikat aus der Umgebungsvariable.
  // Base64-kodiert hinterlegt, weil rohes Mehrzeilen-JSON in manchen Env-Var-UIs
  // durch automatische Zeichen-/Anführungszeichen-Ersetzung beschädigt werden kann.
  const serviceAccount = JSON.parse(
    Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_JSON_B64, "base64").toString("utf8")
  );
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: "dado-automobile-ca04c",
  });
}

const MODEL = "claude-sonnet-5";
const MAX_PDF_BYTES = 8 * 1024 * 1024; // 8 MB
const RATE_LIMIT_PER_HOUR = 20;

const EXTRACTION_PROMPT = `Das ist eine Rechnung/ein Kaufvertrag für den Ankauf eines gebrauchten Fahrzeugs durch einen Autohändler.
Extrahiere folgende Felder und antworte AUSSCHLIESSLICH mit einem JSON-Objekt, ohne Erklärtext, ohne Markdown-Codeblock:

{
  "marke": string oder null,
  "modell": string oder null,
  "variante": string oder null (z.B. Ausstattungslinie),
  "fin": string oder null (Fahrgestellnummer/VIN, 17-stellig),
  "km": number oder null (Kilometerstand),
  "ez": string oder null (Erstzulassung im Format JJJJ-MM-TT; falls nur Monat/Jahr bekannt: JJJJ-MM-01),
  "ekPreis": number oder null (Kaufpreis in Euro, ohne Währungssymbol),
  "ekDatum": string oder null (Kauf-/Rechnungsdatum im Format JJJJ-MM-TT)
}

Wenn ein Feld nicht sicher zu erkennen ist, setze es auf null. Erfinde keine Werte.`;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const authHeader = event.headers.authorization || event.headers.Authorization || "";
  const idToken = authHeader.replace(/^Bearer /, "");
  if (!idToken) {
    return { statusCode: 401, body: JSON.stringify({ error: "Kein Token übermittelt." }) };
  }

  let decoded;
  try {
    decoded = await admin.auth().verifyIdToken(idToken);
  } catch (e) {
    return { statusCode: 401, body: JSON.stringify({ error: "Ungültiger Token." }) };
  }

  const hasAccess = decoded.admin === true
    || (Array.isArray(decoded.apps) && decoded.apps.includes("dado-automobile"));
  if (!hasAccess) {
    return { statusCode: 403, body: JSON.stringify({ error: "Kein Zugriff auf diese Funktion." }) };
  }

  // Aufrufe pro Stunde und Nutzer begrenzen.
  const db = admin.firestore();
  const rateLimitRef = db.collection("meta").doc("invoiceExtractRateLimit_" + decoded.uid);
  const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000;

  const allowed = await db.runTransaction(async (tx) => {
    const snap = await tx.get(rateLimitRef);
    const calls = (snap.exists ? snap.data().calls : []) || [];
    const recentCalls = calls.filter((t) => t > oneHourAgo);
    if (recentCalls.length >= RATE_LIMIT_PER_HOUR) return false;
    recentCalls.push(now);
    tx.set(rateLimitRef, { calls: recentCalls }, { merge: true });
    return true;
  });

  if (!allowed) {
    return { statusCode: 429, body: JSON.stringify({ error: "Zu viele Anfragen diese Stunde. Bitte später erneut versuchen." }) };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: "Ungültiger Request-Body." }) };
  }

  const { pdfBase64 } = body;
  if (!pdfBase64 || typeof pdfBase64 !== "string") {
    return { statusCode: 400, body: JSON.stringify({ error: "Keine PDF-Daten übermittelt." }) };
  }

  const sizeBytes = Buffer.byteLength(pdfBase64, "base64");
  if (sizeBytes > MAX_PDF_BYTES) {
    return { statusCode: 413, body: JSON.stringify({ error: "PDF zu groß (max. 8 MB)." }) };
  }

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  try {
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1024,
      messages: [{
        role: "user",
        content: [
          { type: "document", source: { type: "base64", media_type: "application/pdf", data: pdfBase64 } },
          { type: "text", text: EXTRACTION_PROMPT },
        ],
      }],
    });

    const textBlock = message.content.find((b) => b.type === "text");
    if (!textBlock) {
      return { statusCode: 502, body: JSON.stringify({ error: "Keine Textantwort erhalten." }) };
    }

    let extracted;
    try {
      const cleaned = textBlock.text.trim().replace(/^```json\s*|\s*```$/g, "");
      extracted = JSON.parse(cleaned);
    } catch (e) {
      return { statusCode: 502, body: JSON.stringify({ error: "Antwort konnte nicht als JSON gelesen werden." }) };
    }

    return { statusCode: 200, body: JSON.stringify({ data: extracted }) };
  } catch (e) {
    console.error("Anthropic API Fehler:", e.message || e);
    return { statusCode: 502, body: JSON.stringify({ error: "Fehler bei der Rechnungserkennung." }) };
  }
};
