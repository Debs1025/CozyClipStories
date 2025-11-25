const admin = require("firebase-admin");

let serviceAccount = null;
try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    if (typeof serviceAccount.private_key === "string" && serviceAccount.private_key.includes("\\n")) {
      serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");
    }
  }
} catch (e) {
  console.warn("Invalid FIREBASE_SERVICE_ACCOUNT_JSON:", e && e.message);
  serviceAccount = null;
}

if (!admin.apps.length && serviceAccount) {
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

module.exports = {
  async saveQuiz(userId, storyId, quizData){
    const docRef = db.collection("quizzes").doc(`${userId}_${storyId}`);
    await docRef.set(quizData, { merge: true });
  },

  async getQuiz(userId, storyId){
    const doc = await db.collection("quizzes").doc(`${userId}_${storyId}`).get();
    return doc.exists ? doc.data() : null;
  }
};
