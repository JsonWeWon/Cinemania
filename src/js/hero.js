import {
  fetchMovies,
  BASE_URL,
  ENDPOINTS,
  IMG_BASE_URL,
} from './fetchMovies.js';

function setHeroBackground(movie) {
  const heroItemElement = document.querySelector('#heroImg');

  // Media Query
  const mobileQuery = window.matchMedia('(max-width: 767px)');
  const tabletQuery = window.matchMedia(
    '(min-width: 768px) and (max-width: 1279px)'
  );
  const desktopQuery = window.matchMedia('(min-width: 1280px)');

  // IMG URL
  const mobileImage = `${IMG_BASE_URL}${ENDPOINTS.IMG_W500}${movie.backdrop_path}`;
  const tabletImage = `${IMG_BASE_URL}${ENDPOINTS.IMG_W500}${movie.backdrop_path}`;
  const desktopImage = `${IMG_BASE_URL}${ENDPOINTS.IMG_W500}${movie.backdrop_path}`;

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

  heroItemElement.style.backgroundSize = 'contain';
  heroItemElement.style.backgroundPosition = 'right center';
  heroItemElement.style.backgroundRepeat = 'no-repeat';

  heroItemElement.setAttribute('aria-label', movie.title); //AALT BILGISI
}

fetchMovies(BASE_URL, ENDPOINTS.POPULAR_MOVIES, { page: 1 }).then(data => {
  console.log(data);
  const randomNumber = Math.floor(Math.random() * 20);
  const movie = data.results[randomNumber];

  setHeroBackground(movie);
});

window.addEventListener('resize', () => {
  fetchMovies(BASE_URL, ENDPOINTS.POPULAR_MOVIES, { page: 1 }).then(data => {
    const randomNumber = Math.floor(Math.random() * 20);
    const movie = data.results[randomNumber];

    setHeroBackground(movie);
  });
});
