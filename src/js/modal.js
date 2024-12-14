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
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    // Library management
    function isInLibrary(movieId) {
        const library = JSON.parse(localStorage.getItem('movieLibrary') || '[]');
        return library.includes(movieId);
    }

    function updateLibraryButton(movieId) {
        const isMovieInLibrary = isInLibrary(movieId);
        libraryBtn.textContent = isMovieInLibrary ? 'Remove from my library' : 'Add to my library';
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

    // Populate modal with movie data
    function populateModal(movieData) {
        currentMovieId = movieData.id;

        // Update movie details
        modal.querySelector('.modal-details__image').src = movieData.poster;
        modal.querySelector('.modal-details__image').alt = movieData.title;
        modal.querySelector('.modal-details__title').textContent = movieData.title;
        modal.querySelector('.modal-details__vote').textContent = movieData.vote;
        modal.querySelector('.modal-details__votes').textContent = movieData.votes;
        modal.querySelector('.modal-details__popularity').textContent = movieData.popularity;
        modal.querySelector('.modal-details__genre').textContent = movieData.genre;
        modal.querySelector('.modal-details__about-text').textContent = movieData.about;

        // Update library button state
        updateLibraryButton(movieData.id);

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Export for use in other modules
    window.movieModal = {
        show: populateModal,
        close: closeModal
    };
});
