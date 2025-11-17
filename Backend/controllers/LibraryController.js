// controllers/LibraryController.js
const axios = require("axios");
const fs = require("fs").promises;
const path = require("path");

// === CACHE ===
const CACHE_FILE = path.join(__dirname, "../data/random-pool-cache.json");
let randomPool = [];

(async () => {
  try {
    await fs.mkdir(path.dirname(CACHE_FILE), { recursive: true });
    const data = await fs.readFile(CACHE_FILE, "utf8");
    randomPool = JSON.parse(data);
    console.log(`Loaded ${randomPool.length} books into random pool`);
  } catch {
    console.log("Building fresh random pool...");
  }
})();

async function savePool() {
  try {
    await fs.writeFile(CACHE_FILE, JSON.stringify(randomPool, null, 2));
  } catch (e) {
    console.error("Pool save failed:", e);
  }
}

// === RATE LIMITER ===
const delay = ms => new Promise(r => setTimeout(r, ms));
let lastRequest = 0;
async function wait() {
  const now = Date.now();
  const elapsed = now - lastRequest;
  if (elapsed < 300) await delay(300 - elapsed);
  lastRequest = Date.now();
}

// === BUILD GIANT POOL ONCE ===
async function buildRandomPool() {
  const allBooks = new Map();
  let page = 1;
  let hasMore = true;

  console.log("BUILDING RANDOM POOL (this runs once every 24h)...");

  while (hasMore && page <= 10) {
    await wait();
    const url = `https://gutendex.com/books?languages=en&page=${page}`;
    try {
      const { data } = await axios.get(url, { timeout: 10000 });
      const books = (data.results || []).filter(b =>
        b.formats["text/plain"] || b.formats["text/plain; charset=utf-8"]
      );

      for (const b of books) {
        if (!allBooks.has(b.id)) allBooks.set(b.id, b);
      }

      hasMore = !!data.next;
      page++;
      console.log(`Page ${page - 1}: +${books.length} → Total: ${allBooks.size}`);
    } catch (e) {
      console.log(`Page ${page} failed: ${e.message}`);
      break;
    }
  }

  randomPool = Array.from(allBooks.values());
  await savePool();
  console.log(`RANDOM POOL READY: ${randomPool.length} books`);
}

// === SHUFFLE & PICK ===
function getRandomBooks(limit) {
  if (randomPool.length === 0) return [];
  const shuffled = [...randomPool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, limit);
}

// === SEARCH (optional) ===
async function searchBooks(query) {
  await wait();
  const url = `https://gutendex.com/books?search=${encodeURIComponent(query)}&languages=en`;
  try {
    const { data } = await axios.get(url, { timeout: 10000 });
    return (data.results || []).filter(b =>
      b.formats["text/plain"] || b.formats["text/plain; charset=utf-8"]
    );
  } catch {
    return [];
  }
}

// === CONTROLLER ===
const LibraryController = {
  async getStories(req, res) {
    try {
      let { q, limit = 10 } = req.query;
      limit = Math.min(parseInt(limit) || 10, 50);

      // === BUILD POOL IF EMPTY ===
      if (randomPool.length === 0) {
        await buildRandomPool();
      }

      let books = [];

      if (q && q.trim()) {
        console.log(`\nSEARCH: "${q}"`);
        const results = await searchBooks(q.trim());
        const shuffled = getRandomBooksFrom(results, limit);
        books = shuffled.map(formatBook);
      } else {
        console.log(`\nRANDOM: ${limit} books from pool of ${randomPool.length}`);
        const selected = getRandomBooks(limit);
        books = selected.map(formatBook);
      }

      res.json({
        success: true,
        total: books.length,
        books,
        hasMore: false,
        pool_size: randomPool.length
      });

    } catch (err) {
      console.error("FATAL:", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
};

// === HELPERS ===
function getRandomBooksFrom(arr, n) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

function formatBook(b) {
  const gId = b.id.toString();
  const txt = b.formats["text/plain"] || b.formats["text/plain; charset=utf-8"];
  const cover = b.formats["image/jpeg"] || `https://www.gutenberg.org/cache/epub/${gId}/pg${gId}.cover.medium.jpg`;

  return {
    id: `GB${gId}`,
    title: (b.title || "").split(/ by /i)[0].trim(),
    author: b.authors?.[0]?.name || "Unknown",
    year: b.release_date?.slice(0, 4) || "Unknown",
    subjects: (b.subjects || []).slice(0, 5).map(s => s.split(" -- ")[0]),
    cover_url: cover,
    gutenberg_id: gId,
    source_url: txt,
    content_preview: "…",
    edition_info: {
      publish_date: b.release_date?.slice(0, 10) || "Unknown",
      language: b.languages?.[0] || "en",
    },
  };
}

module.exports = LibraryController;