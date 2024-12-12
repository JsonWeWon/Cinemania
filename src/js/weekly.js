import {
  fetchMovies,
  BASE_URL,
  ENDPOINTS,
  IMG_BASE_URL,
} from './fetchMovies.js';

//const catalogList = document.querySelector('.weekly-movie-card');
const catalogList = document.getElementById("weekly-movie-card");
console.log("weekly div", catalogList);
let genreMap = {};

fetchMovies(BASE_URL, ENDPOINTS.TRENDING_WEEK, { page: 1 }).then(data => {
  console.log('DATAweek :', data);

  // TRENDEKI ILK 3 FILMI DONDURDUM.
  const catalogItems = data.results.slice(0, 3).map(item => {
    const genreNames = item.genre_ids.map(id => genreMap[id]).join(', ');

    return `
      <li class="catalog-item">
        <img class="catalog-img" src="${IMG_BASE_URL}${ENDPOINTS.IMG_W500}${item.poster_path}" alt="${item.title}">
        <div class="catalog-info">
          <h2 class="catalog-title">${item.title}</h2>
          <span class="catalog-span">${genreNames}</span>
        </div>
        <div class="catalog-stars">
          <span class="stars">STARS</span>
        </div>
      </li>
    `;
  });

  catalogList.innerHTML = catalogItems.join('');
});

