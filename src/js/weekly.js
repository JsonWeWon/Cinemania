import {
  fetchMovies,
  BASE_URL,
  ENDPOINTS,
  IMG_BASE_URL,
} from './fetchMovies.js';

const weeklyList = document.querySelector('#weekly-movie-card');

// Weekly movies yükleme
async function loadWeeklyMovies() {
  try {
    const data = await fetchMovies(BASE_URL, ENDPOINTS.TRENDING_WEEK);
    const movies = data.results.slice(0, 3); // İlk 3 filmi alıyoruz

    const catalogItems = movies.map(movie => {
      return `
                <li class="catalog-item" id="weekly-movie-${movie.id}">
                    <img class="catalog-img" src="${IMG_BASE_URL}/w500${
        movie.poster_path
      }" alt="${movie.title}">
                    <div class="catalog-info">
                        <h2 class="catalog-title">${movie.title}</h2>
                    </div>
                    <div class="catalog-stars">
                        <span class="stars">⭐ ${movie.vote_average.toFixed(
                          1
                        )}</span>
                    </div>
                </li>
            `;
    });

    weeklyList.innerHTML = catalogItems.join('');

    // Her film kartına tıklama olayı ekle
    movies.forEach(movie => {
      const movieCard = document.getElementById(`weekly-movie-${movie.id}`);
      movieCard.addEventListener('click', () => {
        window.movieModal.show(movie.id); // Tıklanan filmin ID'sini modal'a gönder
      });
    });
  } catch (error) {
    console.error('Error loading weekly movies:', error);
  }
}

// Weekly movies yükleniyor
loadWeeklyMovies();
