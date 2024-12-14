import axios from 'axios';

const API_KEY = '016a30ce49a7789188b6fa9bad9963a6';
const BASE_URL = 'https://api.themoviedb.org/3';

const paginationNumbers = document.getElementById('paginationNumbers');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const movieList = document.getElementById('movie-list');

let currentPage = 1;
let totalPages = 1;

export async function initPagination() {
  await loadMovies(currentPage);
  updatePaginationUI();
  prevButton.addEventListener('click', () => changePage(currentPage - 1));
  nextButton.addEventListener('click', () => changePage(currentPage + 1));
}

async function fetchMovies(page) {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/week`, {
      params: {
        api_key: API_KEY,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}

async function loadMovies(page) {
  try {
    const data = await fetchMovies(page);
    renderMovies(data.results);
    totalPages = data.total_pages;
    currentPage = page;
    updatePaginationUI();
  } catch (error) {
    console.error('Failed to load movies:', error);
    showErrorMessage('Failed to load movies. Please try again.');
  }
}

function renderMovies(movies) {
  movieList.innerHTML = ''; // Clear current list
  movies.forEach(movie => {
    const movieCard = createMovieCard(movie);
    movieList.appendChild(movieCard);
  });
}

function createMovieCard(movie) {
  const card = document.createElement('div');
  card.className = 'catalog-item';
  card.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`;
  card.innerHTML = `
    <div class="catalog-card-info-container">
      <h3 class="catalog-card-title">${movie.title}</h3>
      <p class="catalog-card-description">${movie.release_date}</p>
      <p class="rating">⭐ ${movie.vote_average.toFixed(1)}</p>
    </div>
  `;
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
  const errorElement = document.createElement('p');
  errorElement.className = 'error-message';
  errorElement.textContent = message;
  movieList.appendChild(errorElement);
}

initPagination();
