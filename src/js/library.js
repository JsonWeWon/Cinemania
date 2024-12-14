document.addEventListener('DOMContentLoaded', () => {
  const libraryContainer = document.querySelector('#library-container');
  const genreDropdown = document.getElementById('genre-dropdown'); // Dropdown

  if (!libraryContainer) {
    console.error("Element with ID 'library-container' not found!");
    return;
  }

  const defaultContent = document.getElementById('default-content');
  const libraryList = document.getElementById('library-list');
  const myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];

  if (myLibrary.length === 0) {
    defaultContent.style.display = 'block';
  } else {
    defaultContent.style.display = 'none';
    renderLibrary(myLibrary);
  }

  genreDropdown.addEventListener('change', e => {
    const genreId = e.target.value;
    if (genreId === 'all') {
      // Show all movies if "All Genres" is selected
      renderLibrary(myLibrary);
    } else {
      const filteredMovies = myLibrary.filter(movie =>
        movie.genre_ids.includes(parseInt(genreId))
      );
      renderLibrary(filteredMovies);
    }
  });

  const goToCatalogButton = document.getElementById('go-to-catalog');
  if (goToCatalogButton) {
    goToCatalogButton.addEventListener('click', () => {
      window.location.href = 'catalog.html';
    });
  }
});

function toggleLibrary(movieData) {
  const myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];
  const existingIndex = myLibrary.findIndex(movie => movie.id === movieData.id);

  if (existingIndex === -1) {
    // Film yoksa ekle
    myLibrary.push(movieData);
  } else {
    // Film varsa çıkar
    myLibrary.splice(existingIndex, 1);
  }

  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function renderLibrary(library) {
  const libraryList = document.getElementById('library-list');
  if (!libraryList) {
    console.error("Element with ID 'library-list' not found!");
    return;
  }

  libraryList.innerHTML = ''; // Listeyi temizle
  if (library.length === 0) {
    document.getElementById('default-content').style.display = 'block';
    return;
  }

  document.getElementById('default-content').style.display = 'none';

  library.forEach(movie => {
    const movieItem = document.createElement('div');
    movieItem.className = 'movie-item';
    movieItem.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
      movie.title
    }" class="movie-poster">
      <div class="catalog-card-info-container">
        <h3 class="catalog-card-title">${movie.title}</h3>
        <p class="catalog-card-description">${
          getGenreNames(movie.genre_ids) || 'Unknown'
        } | ${
      movie.release_date ? movie.release_date.split('-')[0] : 'Unknown'
    }</p>
        <p class="rating">⭐ ${movie.vote_average.toFixed(1)}</p>
      </div>
    `;

    // Modal açma işlemini bağla
    movieItem.addEventListener('click', () => {
      window.movieModal.show(movie.id); // Modal için movieModal.show fonksiyonunu çağır
    });

    libraryList.appendChild(movieItem);
  });
}

function getGenreNames(genreIds) {
  const genreMap = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  };

  if (!genreIds || !Array.isArray(genreIds)) return '';
  const mappedGenres = genreIds.map(id => genreMap[id] || 'Unknown');
  return mappedGenres.join(', ');
}

// Export function to be used in modal.js
window.libraryHandler = {
  toggleLibrary,
};
