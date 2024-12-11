import axios from 'axios';

const API_KEY = '016a30ce49a7789188b6fa9bad9963a6';
const BASE_URL = 'https://api.themoviedb.org/3';

const paginationNumbers = document.getElementById('paginationNumbers');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const movieGrid = document.getElementById('movieGrid');

let currentPage = 1;
let totalPages = 1;
let page = 1;

export async function initPagination() {
  await loadMovies(currentPage);
  updatePaginationUI();
  prevButton.addEventListener('click', () => changePage(currentPage - 1));
  nextButton.addEventListener('click', () => changePage(currentPage + 1));
}

async function fetchMovies() {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        page: page,
        query: "Love"
      },
    });

    console.log("response.data", response.data);
    return response.data;

    
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}

async function loadMovies(page) {
  try {
    const data = await fetchMovies(page);
    console.log("load movie data", data);
    renderMovies(data.results);
    totalPages = data.total_pages;

    console.log("totalPages", totalPages);
    currentPage = page;
    updatePaginationUI();
  } catch (error) {
    console.error('Failed to load movies:', error);
    showErrorMessage('Failed to load movies. Please try again.');
  }
}

function renderMovies(movies) {
  //movieGrid.innerHTML = '';
  movies.forEach(movie => {
    const movieCard = createMovieCard(movie);
    console.log("movieCard", movieCard);
    movieGrid.appendChild(movieCard);
  });
}

function createMovieCard(movie) {
  const card = document.createElement('div');
  card.className = 'movie-card';
  card.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    <h3>${movie.title}</h3>
    <p>Release Date: ${movie.release_date}</p>
    <p>Rating: ${movie.vote_average}/10</p>
  `;
  console.log("card", card);
  return card;
}

function updatePaginationUI() {
  paginationNumbers.innerHTML = '';
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);

  for (let i = startPage; i <= endPage; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.classList.add('pagination-button');
    if (i === currentPage) {
      pageButton.classList.add('active');
    }
    pageButton.addEventListener('click', () => changePage(i));
    paginationNumbers.appendChild(pageButton);
  }

  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
}

async function changePage(newPage) {
  if (newPage >= 1 && newPage <= totalPages) {
    await loadMovies(newPage);
  }
}

function showErrorMessage(message) {
  const errorElement = document.createElement('div');
  errorElement.className = 'error-message';
  errorElement.textContent = message;
  //movieGrid.innerHTML = '';
  movieGrid.appendChild(errorElement);
}

initPagination();

updatePaginationUI();
