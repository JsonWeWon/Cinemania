document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopButton = document.querySelector('.scroll-to-top');
    const scrollThreshold = 100; // Show button after scrolling this many pixels

    // Function to handle button visibility
    function toggleScrollButton() {
        if (window.scrollY > scrollThreshold) {
            scrollToTopButton.classList.add('visible');
        } else {
            scrollToTopButton.classList.remove('visible');
        }
    }

    // Function to scroll to top
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Event listeners
    window.addEventListener('scroll', toggleScrollButton);
    scrollToTopButton.addEventListener('click', scrollToTop);

    // Initial check for button visibility
    toggleScrollButton();
});

