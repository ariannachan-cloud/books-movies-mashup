# Books + Movies Mashup

**Project Description:**  
This project allows users to search for books using the Google Books API and attempts to find matching movie data from the OMDb API. Results are displayed in a table that combines attributes from both sources, along with a computed “Adapted After” field showing the number of years between the book’s publication and the movie release.

**APIs Used:**  
- [Google Books API](https://developers.google.com/books/docs/v1/using#PerformingSearch) – returns book data for a search query, e.g., `https://www.googleapis.com/books/v1/volumes?q=harry+potter`  
- [OMDb API](https://www.omdbapi.com/) – requires a free API key  

**How to Set Up and Run Locally:**  
1. Open app.js and add your OMDb API key as OMDB_KEY.
2. Start a local server:
   npx http-server -p 5500
3. Open your browser at http://localhost:5500

**How the Data Join Works (Short Example):**
1. The Google Books API returns a list of books matching the search query.
2. For each book, the title is used to fetch a movie from the OMDb API.
3. The “Adapted After” field is calculated as:
   Adapted After = Movie Year − Book Year
4. Book and movie attributes are displayed together in the table.

**Known Limitations:**
- Some books may not have corresponding movies in OMDb.
- Publication year or movie year may be missing → “Adapted After” shows —.
- Google Books API requires a q parameter; visiting the base URL alone returns an error.
- Poster images or genres may be missing for some movies.

**Error & Loading States:**
- A "Loading..." message is shown while data is being fetched.  
- If the network fails or the API returns an error, a "Network or API error" message is displayed along with a Retry button.  

**AI Usage Note:**
- AI was used for inspiration on which APIs to use. 