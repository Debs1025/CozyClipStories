// Simple client for Open Library APIs to fetch real books

export async function searchBooks(query, limit = 12) {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Search failed: ${res.status}`);
  const data = await res.json();
  const docs = Array.isArray(data.docs) ? data.docs : [];
  return docs.map((d, i) => {
    const cover = d.cover_i
      ? `https://covers.openlibrary.org/b/id/${d.cover_i}-L.jpg`
      : `https://picsum.photos/seed/search${i}/640/360`;
    return {
      id: d.key || `${d.title}-${i}`,
      title: d.title || "Untitled",
      subtitle:
        (Array.isArray(d.author_name) && d.author_name.join(", ")) ||
        (d.first_publish_year ? `Published ${d.first_publish_year}` : "Unknown author"),
      cover,
      url: d.key ? `https://openlibrary.org${d.key}` : undefined,
    };
  });
}

export async function getSubjectBooks(subject, limit = 12) {
  const url = `https://openlibrary.org/subjects/${encodeURIComponent(subject)}.json?limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Subject fetch failed: ${res.status}`);
  const data = await res.json();
  const works = Array.isArray(data.works) ? data.works : [];
  return works.map((w, i) => {
    const cover = w.cover_id
      ? `https://covers.openlibrary.org/b/id/${w.cover_id}-L.jpg`
      : `https://picsum.photos/seed/${subject}${i}/640/360`;
    const authors = Array.isArray(w.authors) ? w.authors.map((a) => a.name).join(", ") : "Unknown author";
    return {
      id: w.key || `${subject}-${i}`,
      title: w.title || "Untitled",
      subtitle: authors,
      cover,
      url: w.key ? `https://openlibrary.org${w.key}` : undefined,
    };
  });
}