import { fetchMovies, BASE_URL, ENDPOINTS } from './fetchMovies.js';

const movieListContainer = document.getElementById('movie-list');
const errorMessage = document.querySelector('.error-message');

// Trend filmleri yükleme fonksiyonu
async function loadTrendingMovies() {
  try {
    const data = await fetchMovies(BASE_URL, ENDPOINTS.TRENDING_WEEK);
    if (data.results && data.results.length > 0) {
      renderMovies(data.results);
      errorMessage.style.display = 'none'; // Hata mesajını gizle
    } else {
      movieListContainer.innerHTML = ''; // Film listesini temizle
      errorMessage.style.display = 'block'; // Hata mesajını göster
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
    errorMessage.style.display = 'block'; // Hata mesajını göster
  }
}

// Filmleri render etme
function renderMovies(movies) {
  movieListContainer.innerHTML = ''; // Mevcut içeriği temizle
  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.className = 'catalog-item';
    movieCard.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`;

    movieCard.innerHTML = `
      <div class="catalog-card-info-container">
        <h3 class="catalog-card-title">${movie.title}</h3>
        <p class="catalog-card-description">${movie.genre_ids.join(', ')}</p>
        <p class="rating">⭐ ${movie.vote_average.toFixed(1)}</p>
      </div>
    `;
    movieListContainer.appendChild(movieCard);
  });
}

document.addEventListener('DOMContentLoaded', loadTrendingMovies);
