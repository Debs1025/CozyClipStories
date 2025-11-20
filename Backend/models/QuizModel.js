// models/QuizModel.js
const admin = require("firebase-admin");

if (!admin.apps.length) {
  const serviceAccount = require("../FIREBASE_SERVICE_ACCOUNT_KEY.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

const saveQuiz = async (userId, storyId, quizData) => {
  const docRef = db.collection("quizzes").doc(`${userId}_${storyId}`);
  await docRef.set({
    userId,
    storyId,
    title: quizData.title,
    type: quizData.type,
    numQuestions: quizData.numQuestions,
    questions: quizData.questions,
    generatedAt: quizData.generatedAt,
    submitted: quizData.submitted || false,
    submittedAt: quizData.submittedAt || null,
    lastScore: quizData.lastScore || null,
    lastAccuracy: quizData.lastAccuracy || null,
    lastTime: quizData.lastTime || null,
    lastBonus: quizData.lastBonus || null,
    results: quizData.results || null
  }, { merge: true });
};

const getQuiz = async (userId, storyId) => {
  const doc = await db.collection("quizzes").doc(`${userId}_${storyId}`).get();
  return doc.exists ? doc.data() : null;
};

module.exports = { saveQuiz, getQuiz };