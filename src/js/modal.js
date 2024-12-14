document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.modal-details');
  const closeBtn = modal.querySelector('.modal-details__close');
  const libraryBtn = modal.querySelector('.modal-details__library-btn');
  let currentMovieId = null;

  // Close modal handlers
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });

  // Library management
  function isInLibrary(movieId) {
    const library = JSON.parse(localStorage.getItem('movieLibrary') || '[]');
    return library.includes(movieId);
  }

  function updateLibraryButton(movieId) {
    const isMovieInLibrary = isInLibrary(movieId);
    libraryBtn.textContent = isMovieInLibrary
      ? 'Remove from my library'
      : 'Add to my library';
    libraryBtn.dataset.action = isMovieInLibrary ? 'remove' : 'add';
  }

  function toggleLibrary(movieId) {
    const library = JSON.parse(localStorage.getItem('movieLibrary') || '[]');
    const index = library.indexOf(movieId);

    if (index === -1) {
      library.push(movieId);
    } else {
      library.splice(index, 1);
    }

    localStorage.setItem('movieLibrary', JSON.stringify(library));
    updateLibraryButton(movieId);
  }

  libraryBtn.addEventListener('click', () => {
    if (currentMovieId) {
      toggleLibrary(currentMovieId);
    }
  });

  // Fetch movie details using TMDB API
  async function fetchMovieDetails(movieId) {
    const API_KEY = '016a30ce49a7789188b6fa9bad9963a6';
    const BASE_URL = 'https://api.themoviedb.org/3';
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
      );
      if (!response.ok) throw new Error('Failed to fetch movie details');
      return await response.json();
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return null;
    }
  }

  // Populate modal with movie data
  async function populateModal(movieId) {
    const movieData = await fetchMovieDetails(movieId);
    if (!movieData) return;

    currentMovieId = movieData.id;

    // Update movie details
    modal.querySelector(
      '.modal-details__image'
    ).src = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;
    modal.querySelector('.modal-details__image').alt = movieData.title;
    modal.querySelector('.modal-details__title').textContent = movieData.title;
    modal.querySelector('.modal-details__vote').textContent =
      movieData.vote_average.toFixed(1);
    modal.querySelector('.modal-details__votes').textContent =
      movieData.vote_count;
    modal.querySelector('.modal-details__popularity').textContent =
      movieData.popularity.toFixed(1);
    modal.querySelector('.modal-details__genre').textContent = movieData.genres
      .map(genre => genre.name)
      .join(', ');
    modal.querySelector('.modal-details__about-text').textContent =
      movieData.overview;

    // Update library button state
    updateLibraryButton(movieData.id);

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Export for use in other modules
  window.movieModal = {
    show: populateModal,
    close: closeModal,
  };
});
