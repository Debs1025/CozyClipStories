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