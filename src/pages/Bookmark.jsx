import React from 'react';
import searchIcon from '../assets/searchIcon.png';

const booksToday = new Array(9).fill(0).map((_, i) => ({
  id: `t-${i}`,
  title: 'Forever Endeavor',
  subtitle: "This book was about a bird who didn't yet know how to fly",
  cover: `https://picsum.photos/seed/t${i}/640/360`,
}));

const booksYesterday = new Array(4).fill(0).map((_, i) => ({
  id: `y-${i}`,
  title: 'Forever Endeavor',
  subtitle: "This book was about a bird who didn't yet know how to fly",
  cover: `https://picsum.photos/seed/y${i}/640/360`,
}));

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
        <img src={book.cover} alt="cover" className="h-full w-full object-cover" />
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
            <button className="btn bg-brand-card hover:bg-brand-beige">
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
                <input className="w-full px-3 py-2 text-sm outline-none" placeholder="Search bookmarks..." />
                <button className="px-3 py-2 bg-[#870022] hover:bg-[#70001b] text-white">
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
          {/* Today section */}
          <section className="mt-6">
            <h3 className="font-display text-xl">Today</h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {booksToday.map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          </section>

          {/* Yesterday section */}
          <div className="my-6 divider" />
          <section className="mt-6">
            <h3 className="font-display text-xl">Yesterday</h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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