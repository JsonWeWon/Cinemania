import{a as M}from"./vendor-N5iQpiFS.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function o(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(a){if(a.ep)return;a.ep=!0;const r=o(a);fetch(a.href,r)}})();document.addEventListener("DOMContentLoaded",()=>{if(!document.querySelector("#library-container")){console.error("Element with ID 'library-container' not found!");return}const t=document.getElementById("default-content");document.getElementById("library-list");const o=JSON.parse(localStorage.getItem("myLibrary"))||[];o.length===0?t.style.display="block":(t.style.display="none",B(o));const n=document.getElementById("go-to-catalog");n&&n.addEventListener("click",()=>{window.location.href="catalog.html"})});function B(e){const t=document.getElementById("library-list");if(!t){console.error("Element with ID 'library-list' not found!");return}t.innerHTML="",e.forEach(o=>{const n=document.createElement("div");n.className="movie-item",n.innerHTML=`
      <h3>${o.title}</h3>
      <p>${o.description||"Açıklama mevcut değil"}</p>
    `,t.appendChild(n)})}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("theme-switch"),t=document.body,o=localStorage.getItem("theme");o?(t.classList.add(o),e.checked=o==="light-theme"):(t.classList.add("dark-theme"),e.checked=!1),e.addEventListener("change",()=>{e.checked?(t.classList.remove("dark-theme"),t.classList.add("light-theme"),localStorage.setItem("theme","light-theme")):(t.classList.remove("light-theme"),t.classList.add("dark-theme"),localStorage.setItem("theme","dark-theme"))})});const q="016a30ce49a7789188b6fa9bad9963a6",H="https://api.themoviedb.org/3",P="https://image.tmdb.org/t/p",D="/trending/movie/week",x=document.querySelector("#weekly-movie-card");async function G(){try{return(await M.get(`${H}${D}`,{params:{api_key:q}})).data}catch(e){throw console.error("Error fetching movies:",e),e}}async function R(){try{const e=await G();console.log("data",e);const t=e.results.slice(0,3).map(o=>`
        <li class="catalog-item">
          <img class="catalog-img" src="${P}/w500${o.poster_path}" alt="${o.title}">
          <div class="catalog-info">
            <h2 class="catalog-title">${o.title}</h2>
          </div>
          <div class="catalog-stars">
            <span class="stars">STARS</span>
          </div>
        </li>
      `);x.innerHTML=t.join("")}catch(e){console.error("Error",e)}}R();console.log("weeklyjs loaded");document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".mobile-menu-btn"),t=document.querySelector(".mobile-menu"),o=document.querySelector(".mobile-menu-icon use"),n=document.body;function a(){const i=t.classList.contains("is-open"),c=o.getAttribute("href").split("#")[0];t.classList.toggle("is-open"),e.setAttribute("aria-expanded",!i),o.setAttribute("href",i?c+"#icon-menu":c+"#icon-close"),n.style.overflow=i?"":"hidden"}e&&t&&(e.addEventListener("click",c=>{c.stopPropagation(),a()}),document.querySelectorAll(".mobile-nav-link").forEach(c=>{c.addEventListener("click",()=>{a()})}),document.addEventListener("click",c=>{t.classList.contains("is-open")&&!c.target.closest(".mobile-menu")&&!c.target.closest(".mobile-menu-btn")&&a()}),t.addEventListener("click",c=>{c.stopPropagation()}),document.addEventListener("keydown",c=>{c.key==="Escape"&&t.classList.contains("is-open")&&a()}));const r=window.location.pathname;document.querySelectorAll(".nav-link, .mobile-nav-link").forEach(i=>{i.classList.remove("active")}),r.includes("catalog.html")?document.querySelectorAll('[data-page="catalog"]').forEach(i=>{i.classList.add("active")}):r.includes("mylibrary.html")?document.querySelectorAll('[data-page="library"]').forEach(i=>{i.classList.add("active")}):document.querySelectorAll('[data-page="home"]').forEach(i=>{i.classList.add("active")})});const U="016a30ce49a7789188b6fa9bad9963a6",u="https://api.themoviedb.org/3",h="https://image.tmdb.org/t/p",l={TRENDING_WEEK:"/trending/movie/week",TRENDING_DAY:"/trending/movie/day",POPULAR_MOVIES:"/movie/popular",UPCOMING_MOVIES:"/movie/upcoming",MOVIE_DETAILS:e=>`/movie/${e}`,MOVIE_VIDEOS:e=>`/movie/${e}/videos`,SEARCH_MOVIES:"/search/movie",GENRE_LIST:"/genre/movie/list",IMG_W500:"/w500",IMG_W780:"/w780",IMG_W1280:"/w1280",IMG_ORIGINAL:"/original"};async function g(e,t,o={}){try{return(await M.get(`${e}${t}`,{params:{api_key:U,language:"en-US",page:1,...o}})).data}catch(n){throw console.error("Error fetching data:",n),n}}const m=document.querySelector("#heroImg"),V=document.querySelector(".hero-h1"),W=document.querySelector(".hero-summary"),I=document.querySelector(".hero-button-watchTrailer");function F(e){return e.length>170?e.slice(0,170)+"...":e}function j(e){const t=window.matchMedia("(max-width: 767px)"),o=window.matchMedia("(min-width: 768px) and (max-width: 1279px)"),n=window.matchMedia("(min-width: 1280px)"),a=`${h}${l.IMG_W500}${e.backdrop_path}`,r=`${h}${l.IMG_W780}${e.backdrop_path}`,s=`${h}${l.IMG_W1280}${e.backdrop_path}`;t.matches?(m.style.backgroundImage=`url(${a})`,m.style.height="380px"):o.matches?(m.style.backgroundImage=`url(${r})`,m.style.height="432px"):n.matches&&(m.style.backgroundImage=`url(${s})`,m.style.height="720px"),m.setAttribute("aria-label",e.title),V.innerHTML=e.title,W.innerHTML=F(e.overview)}g(u,l.POPULAR_MOVIES,{page:1}).then(e=>{console.log(e);const t=Math.floor(Math.random()*20),o=e.results[t],n=o.id;j(o),g(u,l.MOVIE_VIDEOS(n),{page:1}).then(a=>{const r=a.results.find(s=>s.official===!0&&s.site==="YouTube"&&s.type==="Trailer");if(r){const s=`https://www.youtube.com/watch?v=${r.key}`;I.href=s,I.addEventListener("click",()=>{window.open(s,"_blank")})}else console.log("No official YouTube trailer found.")})});console.log("hero js yüklendi");const Y="016a30ce49a7789188b6fa9bad9963a6",K="https://api.themoviedb.org/3",w=document.getElementById("paginationNumbers"),_=document.getElementById("prevButton"),k=document.getElementById("nextButton"),v=document.getElementById("movie-list");let d=1,p=1;async function Q(){await T(d),N(),_.addEventListener("click",()=>E(d-1)),k.addEventListener("click",()=>E(d+1))}async function J(e){try{return(await M.get(`${K}/trending/movie/week`,{params:{api_key:Y,page:e}})).data}catch(t){throw console.error("Error fetching movies:",t),t}}async function T(e){try{const t=await J(e);z(t.results),p=t.total_pages,d=e,N()}catch(t){console.error("Failed to load movies:",t),Z("Failed to load movies. Please try again.")}}function z(e){v.innerHTML="",e.forEach(t=>{const o=X(t);v.appendChild(o)})}function X(e){const t=document.createElement("div");return t.className="catalog-item",t.style.backgroundImage=`url(https://image.tmdb.org/t/p/w500${e.poster_path})`,t.innerHTML=`
    <div class="catalog-card-info-container">
      <h3 class="catalog-card-title">${e.title}</h3>
      <p class="catalog-card-description">${e.release_date}</p>
      <p class="rating">⭐ ${e.vote_average.toFixed(1)}</p>
    </div>
  `,t}function N(){w.innerHTML="";const e=Math.max(1,d-2),t=Math.min(p,e+4);for(let o=e;o<=t;o++){const n=document.createElement("button");n.textContent=o,n.classList.add("pagination-button"),o===d&&n.classList.add("active"),n.addEventListener("click",()=>E(o)),w.appendChild(n)}_.disabled=d===1,k.disabled=d===p}async function E(e){e>=1&&e<=p&&await T(e)}function Z(e){const t=document.createElement("p");t.className="error-message",t.textContent=e,v.appendChild(t)}Q();const ee=document.getElementById("search-input"),te=document.getElementById("search-button"),$=document.getElementById("movie-list"),L=document.querySelector(".error-message");te.addEventListener("click",()=>{const e=ee.value.trim();e&&(oe(e),console.log("query",e))});async function oe(e){try{const t=await g(u,l.SEARCH_MOVIES,{query:e});t.results.length?ne(t.results):S("No movies found.")}catch(t){console.error("Error searching movies:",t),S("Something went wrong. Please try again later.")}}function ne(e){$.innerHTML="",L.style.display="none",e.forEach(t=>{const o=document.createElement("div");o.className="catalog-item",o.style.backgroundImage=`url(https://image.tmdb.org/t/p/w500${t.poster_path})`,o.innerHTML=`
      <div class="catalog-card-info-container">
        <h3 class="catalog-card-title">${t.title}</h3>
        <p class="catalog-card-description">${ae(t.genre_ids)}</p>
        <p class="rating">⭐ ${t.vote_average.toFixed(1)}</p>
      </div>
    `,$.appendChild(o)})}function S(e){L.textContent=e,L.style.display="block"}function ae(e){const t={28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",99:"Documentary",18:"Drama",10751:"Family",14:"Fantasy",36:"History",27:"Horror",10402:"Music",9648:"Mystery",10749:"Romance",878:"Science Fiction",10770:"TV Movie",53:"Thriller",10752:"War",37:"Western"};return e.map(o=>t[o]||"Unknown").join(", ")}const y=document.querySelector("#content-poster"),re=document.querySelector("#movie-title"),se=document.querySelector("#date-of-release"),ce=document.querySelector("#avarage-vote"),ie=document.querySelector("#popularity"),le=document.querySelector("#count-vote"),de=document.querySelector("#genres");let O={};const me=document.querySelector("#summary");g(u,l.GENRE_LIST).then(e=>{e.genres.forEach(t=>{O[t.id]=t.name})});const ue=()=>{g(u,l.UPCOMING_MOVIES,{page:1}).then(e=>{const t=new Date,o=e.results.filter(n=>new Date(n.release_date)>=t);if(o.length>0){const n=o[Math.floor(Math.random()*o.length)],a=`${h}${l.IMG_W1280}${n.backdrop_path}`;y.src=a,y.alt=n.title,y.title=n.overview,re.innerHTML=`${n.title}`;const r=new Date(n.release_date),s=r.getDate().toString().padStart(2,"0"),i=(r.getMonth()+1).toString().padStart(2,"0"),c=r.getFullYear();se.innerHTML=`${s}.${i}.${c}`,ce.innerHTML=`${n.vote_average}`,ie.innerHTML=`${n.popularity}`,le.innerHTML=`${n.vote_count}`;const A=n.genre_ids.map(C=>O[C]).join(", ");de.innerHTML=A,me.innerHTML=`${n.overview}`}})};ue();console.log("upcoming js yüklendi");const b=document.getElementById("movie-list"),f=document.querySelector(".error-message");async function ge(){try{const e=await g(u,l.TRENDING_WEEK);e.results&&e.results.length>0?(he(e.results),f.style.display="none"):(b.innerHTML="",f.style.display="block")}catch(e){console.error("Error fetching movies:",e),f.style.display="block"}}function he(e){b.innerHTML="",e.forEach(t=>{const o=document.createElement("div");o.className="catalog-item",o.style.backgroundImage=`url(https://image.tmdb.org/t/p/w500${t.poster_path})`,o.innerHTML=`
      <div class="catalog-card-info-container">
        <h3 class="catalog-card-title">${t.title}</h3>
        <p class="catalog-card-description">${t.genre_ids.join(", ")}</p>
        <p class="rating">⭐ ${t.vote_average.toFixed(1)}</p>
      </div>
    `,b.appendChild(o)})}document.addEventListener("DOMContentLoaded",ge);
//# sourceMappingURL=main-Bu4A6yx3.js.map