import {
  fetchMovies,
  BASE_URL,
  ENDPOINTS,
  IMG_BASE_URL,
} from './fetchMovies.js';


const heroItemElement = document.querySelector('#heroImg');
const heroItemTitle = document.querySelector('.hero-h1');
const starContainer = document.querySelector('.hero-rating-stars');
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
  // console.log(data); //buildden sonra sil
  const randomNumber = Math.floor(Math.random() * 20);
  const movie = data.results[randomNumber];
  const movieId = movie.id;
  const movieRating = movie.vote_average;
  // console.log("MovieRating:", movieRating);

  renderStarRating(movieRating, starContainer); //Yılzızı belirledik

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
        // heroButtonWatchTrailer.addEventListener('click', () => {
        //   window.open(youtubeUrl, '_blank');
        // });
      } else {
        console.log('No official YouTube trailer found.');
      }
    }
  );
});

const fullStarSVG = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M13.852 16.875C13.7336 16.8755 13.6181 16.8386 13.5219 16.7696L9.00048 13.4916L4.47903 16.7696C4.38243 16.8396 4.26606 16.8772 4.14673 16.8767C4.0274 16.8763 3.91129 16.8379 3.81521 16.7672C3.71912 16.6964 3.64803 16.5969 3.61221 16.4831C3.57639 16.3693 3.5777 16.247 3.61594 16.134L5.37938 10.9108L0.809069 7.77661C0.710073 7.7088 0.635356 7.61111 0.595836 7.49781C0.556316 7.3845 0.554063 7.26154 0.589407 7.14686C0.624751 7.03219 0.695839 6.93183 0.792285 6.86044C0.888732 6.78904 1.00548 6.75036 1.12548 6.75005H6.76384L8.4654 1.51352C8.50205 1.40047 8.57358 1.30193 8.6697 1.23204C8.76583 1.16216 8.88163 1.12451 9.00048 1.12451C9.11932 1.12451 9.23512 1.16216 9.33125 1.23204C9.42738 1.30193 9.4989 1.40047 9.53555 1.51352L11.2371 6.75181H16.8755C16.9956 6.75175 17.1126 6.79016 17.2094 6.86141C17.3061 6.93267 17.3775 7.03303 17.413 7.14778C17.4486 7.26254 17.4465 7.38568 17.407 7.49915C17.3675 7.61262 17.2928 7.71047 17.1936 7.77837L12.6216 10.9108L14.384 16.1325C14.4125 16.2171 14.4205 16.3072 14.4074 16.3955C14.3942 16.4837 14.3603 16.5676 14.3083 16.6401C14.2563 16.7127 14.1879 16.7718 14.1085 16.8127C14.0292 16.8535 13.9413 16.8749 13.852 16.875Z" fill="url(#paint0_linear_405_1426)"/>
  <defs>
    <linearGradient id="paint0_linear_405_1426" x1="2.62549" y1="2.25006" x2="13.8755" y2="17.2501" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F84119"/>
      <stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
    </linearGradient>
  </defs>
</svg>`;

const halfStarSVG = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_405_1428)" stroke-linejoin="round"/>
  <path d="M9 1.6875V12.7969L4.14844 16.3125L6.04688 10.6875L1.125 7.3125H7.17188L9 1.6875Z" fill="url(#paint1_linear_405_1428)"/>
  <defs>
    <linearGradient id="paint0_linear_405_1428" x1="3.375" y1="2.625" x2="14.625" y2="16.5" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F84119"/>
      <stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
    </linearGradient>
    <linearGradient id="paint1_linear_405_1428" x1="5.0625" y1="1.6875" x2="5.0625" y2="16.3125" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F84119"/>
      <stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
    </linearGradient>
  </defs>
</svg>`;

const emptyStarSVG = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_405_1431)" stroke-linejoin="round"/>
  <defs>
    <linearGradient id="paint0_linear_405_1431" x1="3.375" y1="2.625" x2="13.5" y2="16.5" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F84119"/>
      <stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
    </linearGradient>
  </defs>
</svg>`;

function renderStarRating(rating, containerElement) {
  if (rating <= 0 || rating >= 10) {
    console.error('Rating must be between 0 and 10');
    return;
  }
  const mappedRating = rating / 2;
  containerElement.innerHTML = '';

  const fullStars = Math.floor(mappedRating);
  const halfStar = mappedRating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  for (let i = 0; i < fullStars; i++) {
    const starElement = document.createElement('div');
    starElement.innerHTML = fullStarSVG;
    containerElement.appendChild(starElement.firstElementChild);
  }

  if (halfStar) {
    const starElement = document.createElement('div');
    starElement.innerHTML = halfStarSVG;
    containerElement.appendChild(starElement.firstElementChild);
  }

  for (let i = 0; i < emptyStars; i++) {
    const starElement = document.createElement('div');
    starElement.innerHTML = emptyStarSVG;
    containerElement.appendChild(starElement.firstElementChild);
  }
}

document.addEventListener('DOMContentLoaded', () => {
    const moreDetailsBtn = document.querySelector('.hero-button-moreDetails');
    
    // Sample movie data for hero section using hero image
    const heroMovieData = {
        id: "hero_123",
        title: "Ghosted",
        poster: "./img/hero-desktop.png", // Using hero image
        vote: "7.3",
        votes: "486",
        popularity: "1654.8",
        genre: "Action Romance Comedy",
        about: "Salt-of-the-earth Cole falls head over heels for enigmatic Sadie — but then makes the shocking discovery that she's a secret agent. Before they can decide on a second date, Cole and Sadie are swept away on an international adventure to save the world."
    };

    // Add click handler to More Details button
    moreDetailsBtn.addEventListener('click', () => {
        // Show modal with hero movie data
        window.movieModal.show(heroMovieData);
    });
});

console.log("hero js yüklendi");