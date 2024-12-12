import { fetchMovies, BASE_URL, ENDPOINTS } from './fetchMovies.js';

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const movieList = document.getElementById('movie-list');
const errorMessage = document.querySelector('.error-message');

searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    searchMovies(query);
    console.log("query", query);
  }
});

async function searchMovies(query) {
  try {
    const data = await fetchMovies(BASE_URL, ENDPOINTS.SEARCH_MOVIES, {
      query,
    });
    if (data.results.length) {
      renderMovies(data.results);
    } else {
      showError('No movies found.');
    }
  } catch (error) {
    console.error('Error searching movies:', error);
    showError('Something went wrong. Please try again later.');
  }
}

function renderMovies(movies) {
  movieList.innerHTML = '';
  errorMessage.style.display = 'none';
  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.className = 'catalog-item';
    movieCard.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`;
    movieCard.innerHTML = `
      <div class="catalog-card-info-container">
        <h3 class="catalog-card-title">${movie.title}</h3>
        <p class="catalog-card-description">${getGenres(movie.genre_ids)}</p>
        <p class="rating">⭐ ${movie.vote_average.toFixed(1)}</p>
      </div>
    `;
    movieList.appendChild(movieCard);
  });
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
}

function getGenres(genreIds) {
  const genres = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  };
  return genreIds.map(id => genres[id] || 'Unknown').join(', ');
}
