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

document.addEventListener('DOMContentLoaded', () => {
    const movieCard = document.querySelector('.movie-card');
    
    // Sample movie data (you would typically get this from your API)
    const sampleMovieData = {
        id: "123",
        title: "Red One",
        poster: "./img/card.png",
        vote: "6.8",
        votes: "317",
        popularity: "1231.7",
        genre: "Comedy Action Fantasy",
        about: "After Santa Claus (codename: Red One) is kidnapped, the North Pole's Head of Security must team up with the world's most infamous tracker in a globe-trotting, action-packed mission to save Christmas."
    };

    // Add click handler to movie card
    movieCard.addEventListener('click', () => {
        // Show modal with movie data
        window.movieModal.show(sampleMovieData);
    });

    // Add hover effect
    movieCard.style.cursor = 'pointer';
});

loadMovies();

console.log("weeklyjs loaded");

