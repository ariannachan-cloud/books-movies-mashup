const OMDB_KEY = "58d3b30c";

const $ = sel => document.querySelector(sel);
const searchBtn = $('#searchBtn');
const retryBtn = $('#retryBtn');
const statusEl = $('#status');
const tbody = $('#results tbody');

function setStatus(msg, cls = "") {
  statusEl.className = `status ${cls}`;
  statusEl.textContent = msg;
}

function extractYear(str) {
  const match = str?.match(/\d{4}/);
  return match ? parseInt(match[0]) : null;
}

async function fetchGoogleBooks(query) {
  const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=5`);
  return res.json();
}

async function fetchOmdb(title) {
  const res = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${OMDB_KEY}`);
  return res.json();
}

function clearResults() {
  tbody.innerHTML = "";
}

function addRow(book, movie) {
  const row = document.createElement('tr');
  const pubYear = extractYear(book.publishedDate);
  const movieYear = extractYear(movie?.Year);
  const adaptedAfter = pubYear && movieYear ? `${movieYear - pubYear} years` : "—";
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${(book.authors || ["—"]).join(", ")}</td>
    <td>${pubYear || "—"}</td>
    <td>${movieYear || "—"}</td>
    <td>${movie?.Genre || "—"}</td>
    <td>${movie?.Poster && movie.Poster !== "N/A" ? `<img src="${movie.Poster}" alt="Poster">` : "—"}</td>
    <td>${adaptedAfter}</td>
  `;
  tbody.appendChild(row);
}

async function runSearch() {
  const query = $('#searchInput').value.trim();
  if (!query) {
    setStatus("Please type a book title.", "error");
    return;
  }

  setStatus("Loading…", "loading");
  searchBtn.disabled = true;
  retryBtn.style.display = "none";
  clearResults();

  try {
    const gbData = await fetchGoogleBooks(query);
    const books = gbData.items?.map(item => item.volumeInfo) || [];
    if (!books.length) {
      setStatus("No books found.", "empty");
      searchBtn.disabled = false;
      return;
    }

    for (let book of books) {
      let movie = null;
      try {
        const omdbData = await fetchOmdb(book.title);
        if (omdbData.Response === "True") movie = omdbData;
      } catch {}
      addRow(book, movie);
    }

    setStatus("");
  } catch (err) {
    console.error(err);
    setStatus("Network or API error.", "error");
    retryBtn.style.display = "inline-block";
  } finally {
    searchBtn.disabled = false;
  }
}

searchBtn.addEventListener('click', runSearch);
retryBtn.addEventListener('click', runSearch);