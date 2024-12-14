// catalog.js

import { fetchMovies, BASE_URL, ENDPOINTS } from './fetchMovies.js';
import { initPagination } from './pagination.js';

const movieListContainer = document.getElementById('movie-list');
const errorMessage = document.querySelector('.error-message');

// Genre ID -> Genre Name map
const genreMap = {
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

// Function to get genre names (limit to first two)
function getGenreNames(genreIds) {
  if (!genreIds || !Array.isArray(genreIds)) return '';
  const mappedGenres = genreIds.map(id => genreMap[id] || 'Unknown');
  const firstTwoGenres = mappedGenres.slice(0, 2);
  return firstTwoGenres.join(', ');
}

// Function to extract release year
function getReleaseYear(releaseDate) {
  return releaseDate ? releaseDate.split('-')[0] : '';
}

async function loadTrendingMovies() {
  try {
    const data = await fetchMovies(BASE_URL, ENDPOINTS.TRENDING_WEEK);
    if (data.results && data.results.length > 0) {
      renderMovies(data.results);
      errorMessage.style.display = 'none';
    } else {
      movieListContainer.innerHTML = '';
      errorMessage.style.display = 'block';
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
    errorMessage.style.display = 'block';
  }
}

function renderMovies(movies) {
  movieListContainer.innerHTML = '';

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.className = 'catalog-item';
    movieCard.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`;

    const genresString = getGenreNames(movie.genre_ids);
    const releaseYear = getReleaseYear(movie.release_date);
    const infoText = `${genresString}${releaseYear ? ` | ${releaseYear}` : ''}`;

    movieCard.innerHTML = `
      <div class="catalog-card-info-container">
        <h3 class="catalog-card-title">${movie.title}</h3>
        <p class="catalog-card-description">${infoText}</p>
        <p class="rating">⭐ ${movie.vote_average.toFixed(1)}</p>
      </div>
    `;
    movieListContainer.appendChild(movieCard);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initPagination();
});
