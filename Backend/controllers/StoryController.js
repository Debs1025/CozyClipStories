// controllers/StoryController.js
const axios = require("axios");

const StoryController = {
  async getStoryById(req, res) {
    try {
      const { id } = req.params;
      if (!id)
        return res.status(400).json({
          success: false,
          message: "Story ID is required",
        });

      // 1️⃣ Fetch metadata
      const workUrl = `https://openlibrary.org/works/${id}.json`;
      const { data: workData } = await axios.get(workUrl);
      const title = workData.title;
      const author = workData.authors
        ? await getAuthorNames(workData.authors)
        : "Unknown";

      // 2️⃣ Get editions
      const editionsUrl = `https://openlibrary.org/works/${id}/editions.json?limit=10`;
      const { data: editionsData } = await axios.get(editionsUrl);
      const editions = editionsData.entries || [];

      let content = null;
      let ocaid = null;

      for (const edition of editions) {
        if (!edition.ocaid) continue;

        ocaid = edition.ocaid;
        const textUrls = [
          `https://archive.org/download/${ocaid}/${ocaid}_djvu.txt`,
          `https://archive.org/download/${ocaid}/${ocaid}.txt`,
          `https://archive.org/stream/${ocaid}/${ocaid}.txt`,
        ];

        for (const url of textUrls) {
          try {
            const response = await axios.get(url, {
              timeout: 7000,
              responseType: "text",
              validateStatus: () => true, // prevent axios from throwing
            });

            const contentType = response.headers["content-type"] || "";

            // Ensure it’s plain text, not HTML
            if (
              response.status === 200 &&
              contentType.includes("text/plain") &&
              response.data.length > 500
            ) {
              content = cleanText(response.data);
              console.log(`✅ Found plain text: ${url}`);
              break;
            }
          } catch {
            continue;
          }
        }

        if (content) break;
      }

      if (!content) {
        return res.status(404).json({
          success: false,
          message: "No readable text version found for this story.",
        });
      }

      res.json({
        success: true,
        story: {
          id,
          title,
          author,
          ocaid,
          content,
        },
      });
    } catch (error) {
      console.error("❌ Error fetching story:", error.message);
      res.status(500).json({
        success: false,
        message: "Failed to fetch story content",
        error: error.message,
      });
    }
  },
};

// Helper to fetch author names
async function getAuthorNames(authors) {
  const names = [];
  for (const author of authors) {
    try {
      const { data } = await axios.get(
        `https://openlibrary.org${author.author.key}.json`
      );
      names.push(data.name);
    } catch {
      continue;
    }
  }
  return names.join(", ");
}

// Helper to clean text (remove strange headers or HTML leftovers)
function cleanText(text) {
  return text
    .replace(/<[^>]*>/g, "") // remove HTML tags if any
    .replace(/\s{3,}/g, "\n") // clean up spacing
    .replace(/â€™/g, "'")
    .replace(/â€œ|â€�/g, '"')
    .trim();
}

module.exports = StoryController;
