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
const storiesCollection = db.collection("stories");

// Optional in-memory cache (for frequently accessed stories)
const storyCache = new Map();
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

/**
 * Get stories with search, filters, and pagination
 */
async function fetchStories({ search, genre, difficulty, readingTime, page = 1, limit = 10 }) {
  try {
    let query = storiesCollection;
    const filters = [];

    // Search by title (case-insensitive)
    if (search) {
      query = query
        .where("title_lower", ">=", search.toLowerCase())
        .where("title_lower", "<=", search.toLowerCase() + "\uf8ff");
      filters.push(`search:${search}`);
    }

    // Genre filter
    if (genre) {
      query = query.where("genre", "==", genre);
      filters.push(`genre:${genre}`);
    }

    // Difficulty filter
    if (difficulty) {
      query = query.where("difficulty", "==", difficulty);
      filters.push(`difficulty:${difficulty}`);
    }

    // Reading time filter
    if (readingTime) {
      query = query.where("estimatedReadingTime", "<=", parseInt(readingTime));
      filters.push(`readingTime:${readingTime}`);
    }

    // Pagination logic
    const cacheKey = `stories:${filters.join("|")}:page=${page}:limit=${limit}`;
    if (storyCache.has(cacheKey)) {
      const cached = storyCache.get(cacheKey);
      if (Date.now() - cached.timestamp < CACHE_TTL) {
        return cached.data; // Return cached result
      }
    }

    const snapshot = await query.offset((page - 1) * limit).limit(limit).get();
    const stories = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    const result = {
      stories,
      pagination: {
        page,
        limit,
        totalFetched: stories.length,
      },
    };

    // Cache the result
    storyCache.set(cacheKey, { timestamp: Date.now(), data: result });

    return result;
  } catch (error) {
    console.error("Error fetching stories:", error);
    throw new Error(`Failed to fetch stories: ${error.message}`);
  }
}

/**
 * Get single story by ID
 */
async function getStoryById(storyId) {
  try {
    if (!storyId) throw new Error("Story ID is required");

    // Check cache first
    if (storyCache.has(storyId)) {
      const cached = storyCache.get(storyId);
      if (Date.now() - cached.timestamp < CACHE_TTL) {
        return cached.data;
      }
    }

    const doc = await storiesCollection.doc(storyId).get();
    if (!doc.exists) throw new Error("Story not found");

    const story = { id: doc.id, ...doc.data() };
    storyCache.set(storyId, { timestamp: Date.now(), data: story });

    return story;
  } catch (error) {
    console.error("Error fetching story by ID:", error);
    throw new Error(`Failed to get story: ${error.message}`);
  }
}

/**
 * Get available genres (for filters)
 */
async function getGenres() {
  try {
    const snapshot = await storiesCollection.get();
    const genres = new Set();

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.genre) genres.add(data.genre);
    });

    return Array.from(genres);
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw new Error(`Failed to fetch genres: ${error.message}`);
  }
}

/**
 * Get trending stories (based on viewCount or completionCount)
 */
async function getTrendingStories(limit = 5) {
  try {
    const snapshot = await storiesCollection
      .orderBy("viewCount", "desc")
      .limit(limit)
      .get();

    const trending = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return trending;
  } catch (error) {
    console.error("Error fetching trending stories:", error);
    throw new Error(`Failed to fetch trending stories: ${error.message}`);
  }
}

module.exports = {
  fetchStories,
  getStoryById,
  getGenres,
  getTrendingStories,
};
