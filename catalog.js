import{f as o,B as n,E as i}from"./assets/search-DMmt71Gz.js";import"./assets/vendor-N5iQpiFS.js";const r=document.getElementById("movie-list"),a=document.querySelector(".error-message");async function c(){try{const e=await o(n,i.TRENDING_WEEK);e.results&&e.results.length>0?(l(e.results),a.style.display="none"):(r.innerHTML="",a.style.display="block")}catch(e){console.error("Error fetching movies:",e),a.style.display="block"}}function l(e){r.innerHTML="",e.forEach(t=>{const s=document.createElement("div");s.className="catalog-item",s.style.backgroundImage=`url(https://image.tmdb.org/t/p/w500${t.poster_path})`,s.innerHTML=`
      <div class="catalog-card-info-container">
        <h3 class="catalog-card-title">${t.title}</h3>
        <p class="catalog-card-description">${t.genre_ids.join(", ")}</p>
        <p class="rating">⭐ ${t.vote_average.toFixed(1)}</p>
      </div>
    `,r.appendChild(s)})}document.addEventListener("DOMContentLoaded",c);
//# sourceMappingURL=catalog.js.map
