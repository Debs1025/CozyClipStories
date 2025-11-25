const admin = require("firebase-admin");

let firebaseConfig = null;
try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    firebaseConfig = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    if (firebaseConfig && typeof firebaseConfig.private_key === "string" && firebaseConfig.private_key.includes("\\n")) {
      firebaseConfig.private_key = firebaseConfig.private_key.replace(/\\n/g, "\n");
    }
  } else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
    firebaseConfig = {
      project_id: process.env.FIREBASE_PROJECT_ID,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    };
  } else {
    firebaseConfig = null;
  }
} catch (err) {
  console.warn("Failed to load firebase config:", err && err.message);
  firebaseConfig = null;
}

if (!admin.apps.length) {
  if (firebaseConfig) {
    admin.initializeApp({ credential: admin.credential.cert(firebaseConfig) });
  } else {
    console.warn("Firebase not initialized: set FIREBASE_SERVICE_ACCOUNT_JSON or FIREBASE_PROJECT_ID/FIREBASE_CLIENT_EMAIL/FIREBASE_PRIVATE_KEY in env");
  }
}

const db = admin.firestore();

module.exports = {
  async saveBookmark(userId, bookId, bookTitle, chapter) {
    const bookmarkId = `${userId}_${bookId}`;
    const docRef = db.collection("bookmarks").doc(bookmarkId);

    const data = {
      userId,
      bookId,
      bookTitle,
      chapter: chapter || 1,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    await docRef.set(data, { merge: true });
    return { bookmarkId, ...data };
  },

  async getBookmarksByUser(userId) {
    const snapshot = await db.collection("bookmarks")
      .where("userId", "==", userId)
      .orderBy("updatedAt", "desc")
      .get();

    const bookmarks = [];
    snapshot.forEach(doc => bookmarks.push({ bookmarkId: doc.id, ...doc.data() }));
    return bookmarks;
  },

  async deleteBookmark(bookmarkId, userId) {
    const docRef = db.collection("bookmarks").doc(bookmarkId);
    const doc = await docRef.get();

    if (!doc.exists || doc.data().userId !== userId) {
      throw new Error("Bookmark not found or unauthorized");
    }

    await docRef.delete();
  }
};