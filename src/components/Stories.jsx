import React, { useEffect, useState } from "react";

const Stories = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch books from OpenLibrary API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(
          "https://openlibrary.org/search.json?q=subject:children&limit=20"
        );
        if (!res.ok) throw new Error(`Status ${res.status}`);

        const data = await res.json();
        const parsed = (data.docs || []).map((item) => ({
          title: item.title || "Untitled",
          authors:
            (item.author_name && item.author_name.join(", ")) || "Unknown",
          cover_id: item.cover_i || null,
          key: item.key || null,
          publish_year: item.first_publish_year || null,
        }));

        setBooks(parsed);
      } catch (err) {
        setError(err.message || "Failed to load books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Shuffle helper for Recommended Stories
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const recommended = shuffleArray(books);
  const latest = books;

  // Split recommended into 2 rows
  const half = Math.ceil(recommended.length / 2);
  const recommendedRows = [recommended.slice(0, half), recommended.slice(half)];

  return (
    <section className="bg-[#fff9f5] py-16 px-6 md:px-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#222] mb-10">
        STORIES
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading stories...</p>
      ) : error ? (
        <p className="text-center text-red-600">Failed to load stories: {error}</p>
      ) : (
        <>
          {/* Recommended Stories (2 rows) */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-[#870022] mb-6">
              Recommended Stories
            </h3>
            {recommendedRows.map((row, i) => (
              <div
                key={i}
                className="flex overflow-x-auto space-x-6 scrollbar-hide snap-x snap-mandatory mb-5 pb-3"
              >
                {row.map((story, index) => {
                  const coverSrc = story.cover_id
                    ? `https://covers.openlibrary.org/b/id/${story.cover_id}-L.jpg`
                    : "/src/assets/no-cover.png";

                  return (
                    <div
                      key={index}
                      className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-md snap-start overflow-hidden hover:scale-105 transition-transform duration-300 flex flex-col"
                    >
                      <img
                        src={coverSrc}
                        alt={story.title}
                        className="w-full h-44 object-cover"
                      />
                      <div className="flex flex-col p-4">
                        <h4
                          className="font-bold text-lg text-[#222] truncate text-left"
                          title={story.title}
                        >
                          {story.title}
                        </h4>
                        <p className="text-base text-gray-700 font-semibold truncate text-left mt-1">
                          {story.authors}
                          {story.publish_year && (
                            <span className="ml-1 text-gray-500 font-medium">
                              ({story.publish_year})
                            </span>
                          )}
                        </p>
                        {story.key && (
                          <div className="flex justify-center mt-4">
                            <a
                              href={`https://openlibrary.org${story.key}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sm bg-[#b0042b] text-white px-3 py-1 rounded-md font-semibold hover:bg-[#8a0321] transition-colors duration-200"
                            >
                              OpenLibrary
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Latest Stories (1 row) */}
          <div>
            <h3 className="text-2xl font-bold text-[#870022] mb-6">
              Latest Stories
            </h3>
            <div className="flex overflow-x-auto space-x-6 scrollbar-hide snap-x snap-mandatory pb-3">
              {latest.map((story, index) => {
                const coverSrc = story.cover_id
                  ? `https://covers.openlibrary.org/b/id/${story.cover_id}-L.jpg`
                  : "/src/assets/no-cover.png";

                return (
                  <div
                    key={index}
                    className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-md snap-start overflow-hidden hover:scale-105 transition-transform duration-300 flex flex-col"
                  >
                    <img
                      src={coverSrc}
                      alt={story.title}
                      className="w-full h-44 object-cover"
                    />
                    <div className="flex flex-col p-4">
                      <h4
                        className="font-bold text-lg text-[#222] truncate text-left"
                        title={story.title}
                      >
                        {story.title}
                      </h4>
                      <p className="text-base text-gray-700 font-semibold truncate text-left mt-1">
                        {story.authors}
                        {story.publish_year && (
                          <span className="ml-1 text-gray-500 font-medium">
                            ({story.publish_year})
                          </span>
                        )}
                      </p>
                      {story.key && (
                        <div className="flex justify-center mt-4">
                          <a
                            href={`https://openlibrary.org${story.key}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm bg-[#b0042b] text-white px-3 py-1 rounded-md font-semibold hover:bg-[#8a0321] transition-colors duration-200"
                          >
                            OpenLibrary
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Stories;
