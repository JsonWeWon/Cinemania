import {
  fetchMovies,
  BASE_URL,
  ENDPOINTS,
  IMG_BASE_URL,
} from './fetchMovies.js';
const heroItemElement = document.querySelector('#heroImg');
const heroItemTitle = document.querySelector('.hero-h1');
const heroItemSummary = document.querySelector('.hero-summary');
const heroButtonWatchTrailer = document.querySelector(
  '.hero-button-watchTrailer'
);

// Yazılar uzun olunca mobilde düğmeleri
// alta atmasın diye
// bir fonksiyon ekledim.
function shortenText(text) {
  const maxLength = 170;
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
}

function setHeroBackground(movie) {
  // Media Query
  const mobileQuery = window.matchMedia('(max-width: 767px)');
  const tabletQuery = window.matchMedia(
    '(min-width: 768px) and (max-width: 1279px)'
  );
  const desktopQuery = window.matchMedia('(min-width: 1280px)');

  // IMG URL
  const mobileImage = `${IMG_BASE_URL}${ENDPOINTS.IMG_W500}${movie.backdrop_path}`;
  const tabletImage = `${IMG_BASE_URL}${ENDPOINTS.IMG_W780}${movie.backdrop_path}`;
  const desktopImage = `${IMG_BASE_URL}${ENDPOINTS.IMG_W1280}${movie.backdrop_path}`;

  // Media Query
  if (mobileQuery.matches) {
    heroItemElement.style.backgroundImage = `url(${mobileImage})`;
    heroItemElement.style.height = '380px';
  } else if (tabletQuery.matches) {
    heroItemElement.style.backgroundImage = `url(${tabletImage})`;
    heroItemElement.style.height = '432px';
  } else if (desktopQuery.matches) {
    heroItemElement.style.backgroundImage = `url(${desktopImage})`;
    heroItemElement.style.height = '720px';
  }

  heroItemElement.setAttribute('aria-label', movie.title);
  heroItemTitle.innerHTML = movie.title;
  heroItemSummary.innerHTML = shortenText(movie.overview);
}

fetchMovies(BASE_URL, ENDPOINTS.POPULAR_MOVIES, { page: 1 }).then(data => {
  console.log(data); //buildden sonra sil
  const randomNumber = Math.floor(Math.random() * 20);
  const movie = data.results[randomNumber];
  const movieId = movie.id;

  setHeroBackground(movie); //Background Heroya Basar
  //OFFICIAL TRAILER
  fetchMovies(BASE_URL, ENDPOINTS.MOVIE_VIDEOS(movieId), { page: 1 }).then(
    videoData => {
      // console.log('VIDEO:', videoData);

      const officialTrailer = videoData.results.find(
        video =>
          video.official === true &&
          video.site === 'YouTube' &&
          video.type === 'Trailer'
      );

      if (officialTrailer) {
        const youtubeUrl = `https://www.youtube.com/watch?v=${officialTrailer.key}`;
        heroButtonWatchTrailer.href = youtubeUrl;
        heroButtonWatchTrailer.addEventListener('click', () => {
          window.open(youtubeUrl, '_blank');
        });
      } else {
        console.log('No official YouTube trailer found.');
      }
    }
  );
});

console.log("hero js yüklendi");

// window.addEventListener('resize', () => {
//   fetchMovies(BASE_URL, ENDPOINTS.POPULAR_MOVIES, { page: 1 }).then(data => {
//     const randomNumber = Math.floor(Math.random() * 20);
//     const movie = data.results[randomNumber];

//     setHeroBackground(movie);
//   });
// });
