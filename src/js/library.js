document.addEventListener('DOMContentLoaded', () => {
  const libraryContainer = document.querySelector('#library-container');

  if (!libraryContainer) {
    console.error("Element with ID 'library-container' not found!");
    return;
  }

  fetch('./partials/library-list.html')
    .then(response => {
      if (!response.ok) {
        throw new Error(
          `Failed to load library-list.html: ${response.statusText}`
        );
      }
      return response.text();
    })
    .then(html => {
      libraryContainer.innerHTML = html;

      const defaultContent = document.getElementById('default-content');
      const libraryList = document.getElementById('library-list');
      const myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];

      if (myLibrary.length === 0) {
        defaultContent.style.display = 'block';
      } else {
        defaultContent.style.display = 'none';
        renderLibrary(myLibrary);
      }

      const goToCatalogButton = document.getElementById('go-to-catalog');
      if (goToCatalogButton) {
        goToCatalogButton.addEventListener('click', () => {
          window.location.href = 'catalog.html';
        });
      }
    })
    .catch(error => {
      console.error('Error loading library-list.html:', error);
    });
});

function renderLibrary(library) {
  const libraryList = document.getElementById('library-list');
  if (!libraryList) {
    console.error("Element with ID 'library-list' not found!");
    return;
  }

  libraryList.innerHTML = '';
  library.forEach(movie => {
    const movieItem = document.createElement('div');
    movieItem.className = 'movie-item';
    movieItem.innerHTML = `
      <h3>${movie.title}</h3>
      <p>${movie.description || 'Açıklama mevcut değil'}</p>
    `;
    libraryList.appendChild(movieItem);
  });
}
