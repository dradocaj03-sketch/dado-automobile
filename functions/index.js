const { onCall, HttpsError } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

function docId(email) {
  return email.trim().toLowerCase();
}

// Läuft bei JEDEM Login (vom Frontend direkt nach der Anmeldung aufgerufen).
// Gleicht die admins/{email}-Sammlung mit den Custom Claims des Nutzers ab und
// entzieht Rechte, wenn der Admin-Eintrag entfernt wurde. Absichtlich nicht
// bedingt aufgerufen ("nur wenn Claims fehlen") - siehe CLAUDE.md Regel 8.
exports.claimSelfFromAdmins = onCall(async (request) => {
  const email = request.auth?.token?.email;
  if (!email) {
    throw new HttpsError("unauthenticated", "Login required");
  }

  const ref = db.collection("admins").doc(docId(email));
  const [doc, user] = await Promise.all([
    ref.get(),
    admin.auth().getUserByEmail(email),
  ]);

  if (!doc.exists) {
    if (user.customClaims && Object.keys(user.customClaims).length > 0) {
      await admin.auth().setCustomUserClaims(user.uid, {});
      return { revoked: true };
    }
    return { claimed: false };
  }

  const data = doc.data();
  const next = {
    admin: data.role === "super",
    apps: Array.isArray(data.apps) ? data.apps : [],
  };
  const current = user.customClaims || {};
  if (JSON.stringify(next) === JSON.stringify(current)) {
    return { claimed: false };
  }

  await admin.auth().setCustomUserClaims(user.uid, next);
  return { claimed: true };
});
