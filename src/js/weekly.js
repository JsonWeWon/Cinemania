import axios from 'axios';
import "./upcoming";

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
        <li class="catalog-item" id="catalog-item-weekly">
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
document.addEventListener('DOMContentLoaded', () => {

  const weeklyCard = document.querySelector("#weekly-movie-card");
  let  heroMovieData = {}
  const movies = fetchMovies();
  movies.then((movie) => {
    console.log("weekly movie", movie.results[0].title)

    // Sample movie data for hero section using hero image
   heroMovieData = {
    id: "hero_123",
    title: `${movie.results.title}`,
    poster: "./img/hero-desktop.png", // Using hero image
    vote: "7.3",
    votes: "486",
    popularity: "1654.8",
    genre: "Action Romance Comedy",
    about: "Salt-of-the-earth Cole falls head over heels for enigmatic Sadie — but then makes the shocking discovery that she's a secret agent. Before they can decide on a second date, Cole and Sadie are swept away on an international adventure to save the world."
};
});
  
  
  



  weeklyCard.addEventListener('click', () => {
  
    window.movieModal.show(heroMovieData);

  });
});

console.log("weeklyjs loaded");

