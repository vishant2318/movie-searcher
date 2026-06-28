const API_KEY = "5a83ed45";

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const movieResults = document.getElementById("movieResults");
const trendingMovies = document.getElementById("trendingMovies");
const loader = document.getElementById("loader");
const themeToggle = document.getElementById("themeToggle");

const fallbackPoster = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='450' viewBox='0 0 300 450'%3E%3Crect width='300' height='450' fill='%231e293b'/%3E%3Ctext x='150' y='230' fill='%23ffffff' font-family='Arial, Helvetica, sans-serif' font-size='18' text-anchor='middle'%3ENo Poster Available%3C/text%3E%3C/svg%3E";

const trendingList = [
  "Interstellar",
  "Inception",
  "Avengers Endgame",
  "The Dark Knight",
  "Oppenheimer",
  "Dune"
];

async function loadTrendingMovies() {

  trendingMovies.innerHTML = "";

  for (const movie of trendingList) {

    const response = await fetch(
      `https://www.omdbapi.com/?t=${movie}&apikey=${API_KEY}`
    );

    const data = await response.json();

    createMovieCard(data, trendingMovies);
  }
}

async function searchMovies() {
 console.log("Search button clicked");
  const query = searchInput.value.trim();

  if (!query) return;

  loader.classList.remove("d-none");
  movieResults.innerHTML = "";
 

  try {

    const response = await fetch(
      `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
    );

    const data = await response.json();

    loader.classList.add("d-none");

    if (data.Response === "False") {

      movieResults.innerHTML = `
        <div class="col-12 text-center">
          <h4>No movies found 😢</h4>
        </div>
      `;

      return;
    }

    data.Search.forEach(movie => {
      createMovieCard(movie, movieResults);
    });

    movieResults.parentElement.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  } catch (error) {

    loader.classList.add("d-none");

    movieResults.innerHTML = `
      <div class="col-12 text-center">
        <h4>Something went wrong.</h4>
      </div>
    `;

    console.error(error);
  }
}

function createMovieCard(movie, container) {

  const col = document.createElement("div");
  col.className = "col-lg-3 col-md-4 col-sm-6";

  const card = document.createElement("div");
  card.className = "movie-card";

  const posterImg = document.createElement("img");
  posterImg.className = "movie-poster";
  posterImg.alt = movie.Title || "Movie poster";

  const posterUrl =
    movie.Poster &&
    movie.Poster !== "N/A" &&
    typeof movie.Poster === "string" &&
    movie.Poster.startsWith("http")
      ? movie.Poster
      : fallbackPoster;

  posterImg.src = posterUrl;
  posterImg.onerror = () => {
    posterImg.src = fallbackPoster;
  };

  const content = document.createElement("div");
  content.className = "movie-content";

  const headerDiv = document.createElement("div");
  headerDiv.className = "d-flex justify-content-between align-items-center";

  const titleEl = document.createElement("h5");
  titleEl.className = "movie-title";
  titleEl.textContent = movie.Title || "Untitled";

  const yearEl = document.createElement("span");
  yearEl.className = "rating-badge";
  yearEl.textContent = movie.Year || "";

  headerDiv.append(titleEl, yearEl);
  content.appendChild(headerDiv);

  if (movie.imdbID) {
    const watchlistBtn = document.createElement("button");
    watchlistBtn.className = "watchlist-btn";
    watchlistBtn.type = "button";
    watchlistBtn.textContent = "❤️ Add to Watchlist";
    watchlistBtn.addEventListener("click", () => addToWatchlist(movie.imdbID));

    const detailsBtn = document.createElement("button");
    detailsBtn.className = "btn btn-outline-light w-100 mt-2";
    detailsBtn.type = "button";
    detailsBtn.textContent = "Details";
    detailsBtn.addEventListener("click", () => showMovieDetails(movie.imdbID));

    content.append(watchlistBtn, detailsBtn);
  }

  card.append(posterImg, content);
  col.appendChild(card);
  container.appendChild(col);
}

async function showMovieDetails(id) {

  const response = await fetch(
    `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
  );

  const movie = await response.json();

  document.getElementById("movieDetails").innerHTML = `

  <div class="row">

      <div class="col-md-4">

          <img
            src="${movie.Poster}"
            class="img-fluid">

      </div>

      <div class="col-md-8">

          <h2 class="movie-detail-title">
            ${movie.Title}
          </h2>

          <p class="movie-info">
            ⭐ IMDb: ${movie.imdbRating}
          </p>

          <p class="movie-info">
            📅 ${movie.Year}
          </p>

          <p class="movie-info">
            🎬 ${movie.Runtime}
          </p>

          <p class="movie-info">
            🎭 ${movie.Genre}
          </p>

          <p class="movie-info">
            🎥 Director: ${movie.Director}
          </p>

          <p class="mt-3">
            ${movie.Plot}
          </p>

      </div>

  </div>
  `;

  const modal = new bootstrap.Modal(
    document.getElementById("movieModal")
  );

  modal.show();
}

function addToWatchlist(id) {

  let watchlist =
    JSON.parse(localStorage.getItem("watchlist")) || [];

  if (!watchlist.includes(id)) {

    watchlist.push(id);

    localStorage.setItem(
      "watchlist",
      JSON.stringify(watchlist)
    );

    alert("Added to Watchlist ✅");

  } else {

    alert("Already in Watchlist ⚡");
  }
}

themeToggle.addEventListener("click", () => {

  document.body.classList.toggle("light-mode");

  const icon =
    themeToggle.querySelector("i");

  if (
    document.body.classList.contains(
      "light-mode"
    )
  ) {

    icon.classList.remove("bi-moon-fill");
    icon.classList.add("bi-sun-fill");

  } else {

    icon.classList.remove("bi-sun-fill");
    icon.classList.add("bi-moon-fill");
  }
});

searchBtn.addEventListener(
  "click",
  event => {
    event.preventDefault();
    searchMovies();
  }
);

searchInput.addEventListener(
  "keypress",
  e => {

    if (e.key === "Enter") {
      searchMovies();
    }
  }
);

loadTrendingMovies();