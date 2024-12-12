import axios from 'axios';

const API_KEY = '016a30ce49a7789188b6fa9bad9963a6';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p';
const ENDPOINT = "/trending/movie/week";

//const catalogList = document.querySelector('.weekly-movie-card');
const catalogList = document.querySelector("#weekly-movie-card");

async function fetchMovies() {
  try {
    const response = await axios.get(`${BASE_URL}${ENDPOINT}`, {
      params: {
        api_key: API_KEY
      },
    });

    return response.data;

    
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}

async function loadMovies() {

  try{
    const data = await fetchMovies();

    console.log("data", data);

    const catalogItems = data.results.slice(0, 3).map(item => {

      return `
        <li class="catalog-item">
          <img class="catalog-img" src="${IMG_BASE_URL}/w500${item.poster_path}" alt="${item.title}">
          <div class="catalog-info">
            <h2 class="catalog-title">${item.title}</h2>
          </div>
          <div class="catalog-stars">
            <span class="stars">STARS</span>
          </div>
        </li>
      `;
    })

    catalogList.innerHTML = catalogItems.join('');
  } catch (error) {
    console.error("Error", error);
  }
}

loadMovies();

console.log("weeklyjs loaded");

