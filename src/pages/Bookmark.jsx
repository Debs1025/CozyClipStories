import React, { useEffect, useState } from 'react';
import searchIcon from '../assets/searchIcon.png';
import { searchBooks, getSubjectBooks } from '../services/booksApi';

// Real books state
const INITIAL_TODAY_SUBJECT = 'fiction';
const INITIAL_YESTERDAY_SUBJECT = 'mystery';

function useBookmarksData() {
  const [booksToday, setBooksToday] = useState([]);
  const [booksYesterday, setBooksYesterday] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function loadInitial() {
      try {
        setLoading(true);
        setError(null);
        const [today, yesterday] = await Promise.all([
          getSubjectBooks(INITIAL_TODAY_SUBJECT, 9),
          getSubjectBooks(INITIAL_YESTERDAY_SUBJECT, 4),
        ]);
        if (!cancelled) {
          setBooksToday(today);
          setBooksYesterday(yesterday);
        }
      } catch (e) {
        if (!cancelled) setError('Failed to load books');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadInitial();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSearch() {
    if (!query.trim()) return;
    try {
      setLoading(true);
      setError(null);
      const results = await searchBooks(query.trim(), 12);
      setBooksToday(results);
    } catch (e) {
      setError('Search failed');
    } finally {
      setLoading(false);
    }
  }

  return {
    booksToday,
    booksYesterday,
    loading,
    error,
    query,
    setQuery,
    handleSearch,
  };
}

function IconPlay(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={props.className}>
      <path d="M8 5v14l11-7z"/>
    </svg>
  );
}

function BookCard({ book }) {
  return (
    <div className="card">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img src={book.cover} alt="cover" className="h-full w-full object-cover max-w-full" />
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg text-brand-ink">{book.title}</h3>
        <p className="mt-1 text-sm text-brand-muted leading-snug line-clamp-2">{book.subtitle}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="p-2" style={{border: 'none', outline: 'none', background: 'transparent'}} aria-label="Bookmark">
              <svg viewBox="0 0 24 24" fill="#166534" className="h-5 w-5 opacity-80 hover:opacity-100" style={{border: 'none', outline: 'none'}}>
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </button>
            <button
              className="btn bg-brand-card hover:bg-brand-beige"
              onClick={() => {
                if (book.url) window.open(book.url, '_blank');
              }}
            >
              <IconPlay className="h-4 w-4 text-brand-button" />
              <span>Read Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Bookmark() {
  const { booksToday, booksYesterday, loading, error, query, setQuery, handleSearch } = useBookmarksData();
  return (
    <>
      {/* Header section - fixed */}
      <div className="p-6 pb-0">
        <div className="rounded-md border border-brand-border bg-brand-beige/60 p-5">
          {/* Header row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-2xl">Your Bookmarks</h2>
            <div className="flex flex-1 justify-center">
              <div className="flex w-full max-w-md items-center overflow-hidden rounded-md border border-brand-border bg-white">
                <input
                  className="w-full px-3 py-2 text-sm outline-none"
                  placeholder="Search bookmarks..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                />
                <button
                  className="px-3 py-2 bg-[#870022] hover:bg-[#70001b] text-white"
                  onClick={handleSearch}
                >
                  <img src={searchIcon} alt="Search" className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn">All Bookmarks</button>
              <button className="btn" aria-label="Go"><span className="text-sm">▶</span></button>
            </div>
          </div>

          <div className="mt-5 divider" />
        </div>
      </div>

      {/* Books section - scrollable */}
      <div className="flex-1 overflow-y-auto p-6 pt-0">
        <div className="rounded-md border border-brand-border bg-brand-beige/60 p-5">
          {loading && (
            <div className="text-sm text-brand-muted">Loading books...</div>
          )}
          {error && (
            <div className="text-sm text-red-700">{error}</div>
          )}
          {/* Today section */}
          <section className="mt-6">
            <h3 className="font-display text-xl">Today</h3>
            <div className="mt-4 grid gap-3 sm:gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
              {booksToday.map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          </section>

          {/* Yesterday section */}
          <div className="my-6 divider" />
          <section className="mt-6">
            <h3 className="font-display text-xl">Yesterday</h3>
            <div className="mt-4 grid gap-3 sm:gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
              {booksYesterday.map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}