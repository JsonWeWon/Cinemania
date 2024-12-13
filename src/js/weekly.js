document.addEventListener('DOMContentLoaded', () => {
    const movieCard = document.querySelector('.movie-card');
    
    // Sample movie data (you would typically get this from your API)
    const sampleMovieData = {
        id: "123",
        title: "Red One",
        poster: "./img/card.png",
        vote: "6.8",
        votes: "317",
        popularity: "1231.7",
        genre: "Comedy Action Fantasy",
        about: "After Santa Claus (codename: Red One) is kidnapped, the North Pole's Head of Security must team up with the world's most infamous tracker in a globe-trotting, action-packed mission to save Christmas."
    };

    // Add click handler to movie card
    movieCard.addEventListener('click', () => {
        // Show modal with movie data
        window.movieModal.show(sampleMovieData);
    });

    // Add hover effect
    movieCard.style.cursor = 'pointer';
});
