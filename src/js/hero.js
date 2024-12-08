import {
  fetchMovies,
  BASE_URL,
  ENDPOINTS,
  IMG_BASE_URL,
} from './fetchMovies.js';

fetchMovies(BASE_URL, ENDPOINTS.POPULAR_MOVIES, { page: 1 }).then(data => {
  console.log(data);
  const randomNumber = Math.floor(Math.random() * 20);
  console.log(randomNumber);
  const movie = data.results[randomNumber];
  const imageUrl = `${IMG_BASE_URL}${ENDPOINTS.IMG_ORIGINAL}${movie.poster_path}`; // Resim URL'sini oluşturuyoruz

  const heroItemElement = document.querySelector('#heroItem');
  const imgElement = document.createElement('img');
  imgElement.src = imageUrl;
  imgElement.alt = movie.title;
  heroItemElement.appendChild(imgElement);
});
