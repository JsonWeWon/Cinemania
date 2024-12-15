import {
  fetchMovies,
  BASE_URL,
  ENDPOINTS,
  IMG_BASE_URL,
} from './fetchMovies.js';

const upcomingBtn = document.querySelector('.upcoming__library-btn');

const UPCOMING_IMG = document.querySelector('#content-poster');
const movieTitle = document.querySelector('#movie-title');
const releaseDateElement = document.querySelector('#date-of-release');
const avarageVote = document.querySelector('#avarage-vote');
const popularity = document.querySelector('#popularity');
const countVote = document.querySelector('#count-vote');
const genres = document.querySelector('#genres');
const summary = document.querySelector('#summary');

let genreMap = {};
let currentMovieId = null; // Aktif film ID'si

// Genre listesini yükle
fetchMovies(BASE_URL, ENDPOINTS.GENRE_LIST).then(data => {
  data.genres.forEach(genre => {
    genreMap[genre.id] = genre.name;
  });
});

// Local Storage kontrolü: Film ID'si Local Storage'ta var mı?
function isInLibrary(movieId) {
  const library = JSON.parse(localStorage.getItem('myLibrary')) || [];
  return library.some(movie => movie.id === movieId);
}

// Buton durumunu günceller
function updateLibraryButton(movieId) {
  const isMovieInLibrary = isInLibrary(movieId);
  upcomingBtn.textContent = isMovieInLibrary
    ? 'Remove from my library'
    : 'Add to my library';
  upcomingBtn.dataset.action = isMovieInLibrary ? 'remove' : 'add';
}

// Local Storage'a ekleme/çıkarma işlemi
function toggleLibrary(movie) {
  const library = JSON.parse(localStorage.getItem('myLibrary')) || [];
  const index = library.findIndex(item => item.id === movie.id);

  if (index === -1) {
    library.push(movie); // Film ekle
  } else {
    library.splice(index, 1); // Film çıkar
  }

  localStorage.setItem('myLibrary', JSON.stringify(library));
  updateLibraryButton(movie.id); // Güncel durumu kontrol et
}

// Upcoming film detaylarını yükle ve butonu güncelle
export const movieInit = async () => {
  try {
    const data = await fetchMovies(BASE_URL, ENDPOINTS.UPCOMING_MOVIES, {
      page: 1,
    });
    const today = new Date();

    // Bugünden sonraki filmleri filtrele
    const futureMovies = data.results.filter(movie => {
      const releaseDate = new Date(movie.release_date);
      return releaseDate >= today;
    });

    if (futureMovies.length > 0) {
      const randomMovie =
        futureMovies[Math.floor(Math.random() * futureMovies.length)];

      // Film detaylarını DOM'a yükle
      currentMovieId = randomMovie.id;
      UPCOMING_IMG.src = `${IMG_BASE_URL}${ENDPOINTS.IMG_W1280}${randomMovie.backdrop_path}`;
      UPCOMING_IMG.alt = randomMovie.title;
      movieTitle.textContent = randomMovie.title;
      releaseDateElement.textContent = new Date(
        randomMovie.release_date
      ).toLocaleDateString('en-GB');
      avarageVote.textContent = randomMovie.vote_average;
      popularity.textContent = randomMovie.popularity;
      countVote.textContent = randomMovie.vote_count;
      genres.textContent = randomMovie.genre_ids
        .map(id => genreMap[id])
        .join(', ');
      summary.textContent = randomMovie.overview;

      // Buton durumunu kontrol et
      updateLibraryButton(currentMovieId);

      // Buton tıklama işlemi
      upcomingBtn.addEventListener('click', () => {
        toggleLibrary(randomMovie);
      });
    }
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
  }
};

// Başlat
movieInit();
