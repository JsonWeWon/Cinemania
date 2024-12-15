import {
  fetchMovies,
  BASE_URL,
  ENDPOINTS,
  IMG_BASE_URL,
} from './fetchMovies.js';

let movieId = 1;

const upcomingBtn = document.querySelector(".upcoming__library-btn");

const UPCOMING_IMG = document.querySelector('#content-poster');
const movieTitle = document.querySelector('#movie-title');
// movieTitle.innerHTML = '';
const releaseDateElement = document.querySelector('#date-of-release');
// releaseDateElement.innerHTML = '';
const avarageVote = document.querySelector('#avarage-vote');
// avarageVote.innerHTML = '';
const popularity = document.querySelector('#popularity');
// popularity.innerHTML = '';
const countVote = document.querySelector('#count-vote');
// countVote.innerHTML = '';
const genres = document.querySelector('#genres');
// genres.innerHTML = '';
let genreMap = {};
const summary = document.querySelector('#summary');
// summary.innerHTML = '';


let upcomingId = document.querySelector(".upcoming-title");
let currentMovieId = 1;


fetchMovies(BASE_URL, ENDPOINTS.GENRE_LIST).then(data => {
  data.genres.forEach(genre => {
    genreMap[genre.id] = genre.name;
  });
});

export const movieInit = () => {

  


  fetchMovies(BASE_URL, ENDPOINTS.UPCOMING_MOVIES, { page: 1 }).then(data => {
    const today = new Date();
  
    // Bugünden sonraki filmleri filtrele
    const futureMovies = data.results.filter(movie => {
      const releaseDate = new Date(movie.release_date);
      console.log("movie id", currentMovieId);
      return releaseDate >= today;
    });
  
    if (futureMovies.length > 0) {
      const randomMovie =
        futureMovies[Math.floor(Math.random() * futureMovies.length)];
      const imageUrl = `${IMG_BASE_URL}${ENDPOINTS.IMG_W1280}${randomMovie.backdrop_path}`;
      movieId = randomMovie
      UPCOMING_IMG.src = imageUrl;
      UPCOMING_IMG.alt = randomMovie.title;
      UPCOMING_IMG.title = randomMovie.overview;
      movieTitle.innerHTML = `${randomMovie.title}`;
      console.log("movie ", randomMovie.id);

      currentMovieId = randomMovie.id;

      console.log("verelim bir veri", currentMovieId);


      function isInLibrary() {
        const library = JSON.parse(localStorage.getItem('myLibrary')) || [];
        return library.some(movie => movie.id === currentMovieId);
      }
    
      function updateLibraryButton() {
        const isMovieInLibrary = isInLibrary(currentMovieId);
        upcomingBtn.textContent = isMovieInLibrary
          ? 'Remove from my library'
          : 'Add to my library';
        upcomingBtn.dataset.action = isMovieInLibrary ? 'remove' : 'add';
      }

      function toggleLibrary() {
        const library = JSON.parse(localStorage.getItem('myLibrary')) || [];
        const index = library.findIndex(item => item.id === movieId.id);

        console.log("index", index);
    
        // Eğer genres dizisi varsa ve genre_ids yoksa, mapleme yap
        if (movieId.genres && !movieId.genre_ids) {
          movieId.genre_ids = movieId.genres.map(genre => genre.id);
        }
    
        // Eğer genre_ids varsa ve genres yoksa, mapleme yap
        if (movieId.genre_ids && !movieId.genres) {
          movieId.genres = movieId.genre_ids.map(id => ({
            id,
            name: genreMap[id] || 'Unknown',
          }));
        }
    
        if (index === -1) {
          // Yeni film ekle
          library.push(movieId);
        } else {
          // Zaten varsa çıkar
          library.splice(index, 1);
        }
    
        localStorage.setItem('myLibrary', JSON.stringify(library));
        updateLibraryButton(movieId.id);
      }

      upcomingBtn.addEventListener('click', () => {
        if (currentMovieId) {
          const movieData = veriAl(currentMovieId);
          toggleLibrary(movieData);
      }});
  
      //DATE
      const releaseDate = new Date(randomMovie.release_date);
      const day = releaseDate.getDate().toString().padStart(2, '0');
      const month = (releaseDate.getMonth() + 1).toString().padStart(2, '0');
      const year = releaseDate.getFullYear();
      releaseDateElement.innerHTML = `${day}.${month}.${year}`;
      // console.log(releaseDateElement);
  
      avarageVote.innerHTML = `${randomMovie.vote_average}`;
      popularity.innerHTML = `${randomMovie.popularity}`;
      countVote.innerHTML = `${randomMovie.vote_count}`;
      //GENRE
      const genreNames = randomMovie.genre_ids.map(id => genreMap[id]).join(', ');
      genres.innerHTML = genreNames;
      summary.innerHTML = `${randomMovie.overview}`;
    }

     function veriAl(id) { fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=016a30ce49a7789188b6fa9bad9963a6&language=en-US`)
      .then(response => response.json())
      .then(data => {
        console.log("veriAL", data);
        return data; // Alınan veriler burada işlenir
      })
      .catch(error => {
        console.error('Hata oluştu:', error);
      });
    }

    const turkiye = veriAl(currentMovieId);

    console.log("turkiye", turkiye);
    
  });

  
}


movieInit(); 

console.log("upcoming js yüklendi");
