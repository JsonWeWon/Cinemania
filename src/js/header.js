document.addEventListener('DOMContentLoaded', () => {
    // Get current page path
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    // Remove active class from all links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Add active class based on current page
    if (currentPath.includes('catalog.html')) {
        document.querySelector('[data-page="catalog"]').classList.add('active');
    } else if (currentPath.includes('mylibrary.html')) {
        document.querySelector('[data-page="library"]').classList.add('active');
    } else {
        // Default to home for index.html or root path
        document.querySelector('[data-page="home"]').classList.add('active');
    }
});
