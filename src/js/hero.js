import {
  fetchMovies,
  BASE_URL,
  ENDPOINTS,
  IMG_BASE_URL,
} from './fetchMovies.js';

import "./weekly.js"
import "./upcoming.js"
import "./loader.js"
import "./scroll-to-top.js";

const heroItemElement = document.querySelector('#heroImg');
const heroItemTitle = document.querySelector('.hero-h1');
const starContainer = document.querySelector('.hero-rating-stars');
const heroItemSummary = document.querySelector('.hero-summary');
const moreDetailsBtn = document.querySelector('.hero-button-moreDetails');
const heroButtonWatchTrailer = document.querySelector(
  '.hero-button-watchTrailer'
);



// Movie ID to fetch details
let heroMovieId = null;

// Yazılar uzun olunca mobilde düğmeleri alta atmaması için bir kısaltma fonksiyonu
function shortenText(text) {
  const maxLength = 170;
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

// Hero arka planını ve bilgileri ayarla
function setHeroBackground(movie) {
  const mobileImage = `${IMG_BASE_URL}/w500${movie.backdrop_path}`;
  const tabletImage = `${IMG_BASE_URL}/w780${movie.backdrop_path}`;
  const desktopImage = `${IMG_BASE_URL}/w1280${movie.backdrop_path}`;

  // Media Query
  if (window.matchMedia('(max-width: 767px)').matches) {
    heroItemElement.style.backgroundImage = `url(${mobileImage})`;
    heroItemElement.style.height = '380px';
  } else if (
    window.matchMedia('(min-width: 768px) and (max-width: 1279px)').matches
  ) {
    heroItemElement.style.backgroundImage = `url(${tabletImage})`;
    heroItemElement.style.height = '432px';
  } else {
    heroItemElement.style.backgroundImage = `url(${desktopImage})`;
    heroItemElement.style.height = '720px';
  }

  heroItemElement.setAttribute('aria-label', movie.title);
  heroItemTitle.innerHTML = movie.title;
  heroItemSummary.innerHTML = shortenText(movie.overview);
  heroMovieId = movie.id; // Save movie ID for modal
}

// Fetch hero movie data
fetchMovies(BASE_URL, ENDPOINTS.POPULAR_MOVIES, { page: 1 }).then(data => {
  if (data.results && data.results.length > 0) {
    const randomNumber = Math.floor(Math.random() * 20);
    const movie = data.results[randomNumber];
    setHeroBackground(movie);
  } else {
    console.error('No movies found for hero section.');
  }
});

// Event listener for "More Details" button
moreDetailsBtn.addEventListener('click', () => {
  if (heroMovieId) {
    window.movieModal.show(heroMovieId); // Pass hero movie ID to modal
  }
});
