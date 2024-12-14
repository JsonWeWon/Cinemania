// search.js

import { setSearchQuery } from './pagination.js';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const clearButton = document.getElementById('clear-button');

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
  setSearchQuery('');
});

// 3) Form submit (Enter'a basınca veya "Search" butonuna tıklayınca)
searchForm.addEventListener('submit', e => {
  e.preventDefault(); // default form submit engelle
  const query = searchInput.value.trim();
  setSearchQuery(query);
});
