const axios = require("axios");

async function hasReadableText(ocaid) {
  if (!ocaid) return false;
  const textUrls = [
    `https://archive.org/download/${ocaid}/${ocaid}.txt`,
    `https://archive.org/download/${ocaid}/${ocaid}_djvu.txt`,
    `https://archive.org/stream/${ocaid}/${ocaid}.txt`
  ];

  for (const url of textUrls) {
    try {
      const resp = await axios.get(url, { timeout: 4000 });
      const text = resp.data;
      if (typeof text !== "string") continue;
      if (text.startsWith("<!DOCTYPE") || text.startsWith("<html")) continue;
      if (text.length < 500) continue;
      return true;
    } catch {
      continue;
    }
  }
  return false;
}

async function checkBook(book) {
  try {
    const workId = book.key?.replace("/works/", "");
    if (!workId) return null;

    const editionsUrl = `https://openlibrary.org/works/${workId}/editions.json?limit=3`;
    const { data: editionsData } = await axios.get(editionsUrl);
    const editions = editionsData.entries || [];

    for (const edition of editions) {
      if (!edition.ocaid) continue;
      if (await hasReadableText(edition.ocaid)) {
        return {
          id: workId,
          title: book.title,
          author: book.author_name ? book.author_name.join(", ") : "Unknown",
          year: book.first_publish_year || "Unknown",
          subjects: book.subject ? book.subject.slice(0, 5) : [],
          cover_url: book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
            : null
        };
      }
    }
  } catch {
    return null;
  }
  return null;
}

const LibraryController = {
  async getStories(req, res) {
    try {
      let { q, genre, limit = 10, page = 1 } = req.query;
      if (!q && !genre) q = "classic literature";

      const searchLimit = 100; // more candidates, still reasonable
      const url = `https://openlibrary.org/search.json?${
        q ? `q=${encodeURIComponent(q)}&` : ""
      }${genre ? `subject=${encodeURIComponent(genre)}&` : ""}limit=${searchLimit}&page=${page}`;

      const { data } = await axios.get(url);
      const allBooks = data.docs || [];
      const readableBooks = [];

      // Process in smaller batches
      const batchSize = 5;
      for (let i = 0; i < allBooks.length && readableBooks.length < limit; i += batchSize) {
        const batch = allBooks.slice(i, i + batchSize);
        const results = await Promise.all(batch.map(checkBook));

        for (const book of results) {
          if (book) readableBooks.push(book);
          if (readableBooks.length >= limit) break;
        }
      }

      res.json({
        success: true,
        total: readableBooks.length,
        books: readableBooks
      });
    } catch (err) {
      console.error("❌ LibraryController error:", err.message);
      res.status(500).json({
        success: false,
        message: "Failed to fetch readable stories."
      });
    }
  }
};

module.exports = LibraryController;
