import { setSearchQuery } from './pagination.js';

// Referanslar
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const clearButton = document.getElementById('clear-button');
const movieListContainer = document.getElementById('movie-list'); // Arama sonuçlarını göstermek için

// 1) Input değişince X butonunu göster/gizle
searchInput.addEventListener('input', () => {
  if (searchInput.value.trim() !== '') {
    clearButton.style.display = 'inline';
  } else {
    clearButton.style.display = 'none';
  }
});

// 2) X butonuna tıklayınca input temizle, trending'e dön
clearButton.addEventListener('click', () => {
  searchInput.value = '';
  clearButton.style.display = 'none';
  setSearchQuery(''); // Varsayılan sonuçlara dön
});

// 3) Form submit (Enter'a basınca veya "Search" butonuna tıklayınca)
searchForm.addEventListener('submit', e => {
  e.preventDefault(); // default form submit engelle
  const query = searchInput.value.trim();
  if (query) {
    setSearchQuery(query);
    attachModalToSearchResults(); // Modal bağlantılarını her arama sonrası ekle
  }
});

// 4) Modal bağlantısını ekle
function attachModalToSearchResults() {
  const movieCards = movieListContainer.querySelectorAll('.catalog-item'); // Film kartlarını seç
  movieCards.forEach(card => {
    const movieId = card.id.split('-')[2]; // Kart ID'sinden film ID'sini al
    card.addEventListener('click', () => {
      window.movieModal.show(movieId); // Modal'ı aç ve ID'yi gönder
    });
  });
}
