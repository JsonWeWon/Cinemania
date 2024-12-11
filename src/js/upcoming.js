import {
  fetchMovies,
  BASE_URL,
  ENDPOINTS,
  IMG_BASE_URL,
} from './fetchMovies.js';

const UPCOMING_IMG = document.querySelector('#content-poster');
const movieTitle = document.querySelector('#movie-title');
// movieTitle.innerHTML = '';
const releaseDateElement = document.querySelector('#date-of-release');
// releaseDateElement.innerHTML = '';
const avarageVote = document.querySelector('#avarage-vote');
// avarageVote.innerHTML = '';
const popularity = document.querySelector('#popularity');
// popularity.innerHTML = '';
const countVote = document.querySelector('#count-vote');
// countVote.innerHTML = '';
const genres = document.querySelector('#genres');
// genres.innerHTML = '';
let genreMap = {};
const summary = document.querySelector('#summary');
// summary.innerHTML = '';
fetchMovies(BASE_URL, ENDPOINTS.GENRE_LIST).then(data => {
  data.genres.forEach(genre => {
    genreMap[genre.id] = genre.name;
  });
});

fetchMovies(BASE_URL, ENDPOINTS.UPCOMING_MOVIES, { page: 1 }).then(data => {
  const today = new Date();

  // Bugünden sonraki filmleri filtrele
  const futureMovies = data.results.filter(movie => {
    const releaseDate = new Date(movie.release_date);
    return releaseDate >= today;
  });

  if (futureMovies.length > 0) {
    const randomMovie =
      futureMovies[Math.floor(Math.random() * futureMovies.length)];
    const imageUrl = `${IMG_BASE_URL}${ENDPOINTS.IMG_W1280}${randomMovie.backdrop_path}`;

    UPCOMING_IMG.src = imageUrl;
    UPCOMING_IMG.alt = randomMovie.title;
    UPCOMING_IMG.title = randomMovie.overview;
    movieTitle.innerHTML = `${randomMovie.title}`;

    //DATE
    const releaseDate = new Date(randomMovie.release_date);
    const day = releaseDate.getDate().toString().padStart(2, '0');
    const month = (releaseDate.getMonth() + 1).toString().padStart(2, '0');
    const year = releaseDate.getFullYear();
    releaseDateElement.innerHTML = `${day}.${month}.${year}`;
    // console.log(releaseDateElement);

    avarageVote.innerHTML = `${randomMovie.vote_average}`;
    popularity.innerHTML = `${randomMovie.popularity}`;
    countVote.innerHTML = `${randomMovie.vote_count}`;
    //GENRE
    const genreNames = randomMovie.genre_ids.map(id => genreMap[id]).join(', ');
    genres.innerHTML = genreNames;
    summary.innerHTML = `${randomMovie.overview}`;
  }
});
