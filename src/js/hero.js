document.addEventListener('DOMContentLoaded', () => {
    const moreDetailsBtn = document.querySelector('.hero-button-moreDetails');
    
    // Sample movie data for hero section using hero image
    const heroMovieData = {
        id: "hero_123",
        title: "Ghosted",
        poster: "./img/hero-desktop.png", // Using hero image
        vote: "7.3",
        votes: "486",
        popularity: "1654.8",
        genre: "Action Romance Comedy",
        about: "Salt-of-the-earth Cole falls head over heels for enigmatic Sadie — but then makes the shocking discovery that she's a secret agent. Before they can decide on a second date, Cole and Sadie are swept away on an international adventure to save the world."
    };

    // Add click handler to More Details button
    moreDetailsBtn.addEventListener('click', () => {
        // Show modal with hero movie data
        window.movieModal.show(heroMovieData);
    });
});
