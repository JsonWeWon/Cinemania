import{a as v}from"./vendor-N5iQpiFS.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function o(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(a){if(a.ep)return;a.ep=!0;const r=o(a);fetch(a.href,r)}})();document.addEventListener("DOMContentLoaded",()=>{if(!document.querySelector("#library-container")){console.error("Element with ID 'library-container' not found!");return}const t=document.getElementById("default-content");document.getElementById("library-list");const o=JSON.parse(localStorage.getItem("myLibrary"))||[];o.length===0?t.style.display="block":(t.style.display="none",O(o));const n=document.getElementById("go-to-catalog");n&&n.addEventListener("click",()=>{window.location.href="catalog.html"})});function O(e){const t=document.getElementById("library-list");if(!t){console.error("Element with ID 'library-list' not found!");return}t.innerHTML="",e.forEach(o=>{const n=document.createElement("div");n.className="movie-item",n.innerHTML=`
      <h3>${o.title}</h3>
      <p>${o.description||"Açıklama mevcut değil"}</p>
    `,t.appendChild(n)})}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("theme-switch"),t=document.body,o=localStorage.getItem("theme");o?(t.classList.add(o),e.checked=o==="light-theme"):(t.classList.add("dark-theme"),e.checked=!1),e.addEventListener("change",()=>{e.checked?(t.classList.remove("dark-theme"),t.classList.add("light-theme"),localStorage.setItem("theme","light-theme")):(t.classList.remove("light-theme"),t.classList.add("dark-theme"),localStorage.setItem("theme","dark-theme"))})});const N="016a30ce49a7789188b6fa9bad9963a6",P="https://api.themoviedb.org/3",A="https://image.tmdb.org/t/p",q="/trending/movie/week",B=document.querySelector("#weekly-movie-card");async function D(){try{return(await v.get(`${P}${q}`,{params:{api_key:N}})).data}catch(e){throw console.error("Error fetching movies:",e),e}}async function G(){try{const e=await D();console.log("data",e);const t=e.results.slice(0,3).map(o=>`
        <li class="catalog-item">
          <img class="catalog-img" src="${A}/w500${o.poster_path}" alt="${o.title}">
          <div class="catalog-info">
            <h2 class="catalog-title">${o.title}</h2>
          </div>
          <div class="catalog-stars">
            <span class="stars">STARS</span>
          </div>
        </li>
      `);B.innerHTML=t.join("")}catch(e){console.error("Error",e)}}G();console.log("weeklyjs loaded");document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".mobile-menu-btn"),t=document.querySelector(".mobile-menu"),o=document.querySelector(".mobile-menu-icon use"),n=document.body;function a(){const i=t.classList.contains("is-open"),c=o.getAttribute("href").split("#")[0];t.classList.toggle("is-open"),e.setAttribute("aria-expanded",!i),o.setAttribute("href",i?c+"#icon-menu":c+"#icon-close"),n.style.overflow=i?"":"hidden"}e&&t&&(e.addEventListener("click",c=>{c.stopPropagation(),a()}),document.querySelectorAll(".mobile-nav-link").forEach(c=>{c.addEventListener("click",()=>{a()})}),document.addEventListener("click",c=>{t.classList.contains("is-open")&&!c.target.closest(".mobile-menu")&&!c.target.closest(".mobile-menu-btn")&&a()}),t.addEventListener("click",c=>{c.stopPropagation()}),document.addEventListener("keydown",c=>{c.key==="Escape"&&t.classList.contains("is-open")&&a()}));const r=window.location.pathname;document.querySelectorAll(".nav-link, .mobile-nav-link").forEach(i=>{i.classList.remove("active")}),r.includes("catalog.html")?document.querySelectorAll('[data-page="catalog"]').forEach(i=>{i.classList.add("active")}):r.includes("mylibrary.html")?document.querySelectorAll('[data-page="library"]').forEach(i=>{i.classList.add("active")}):document.querySelectorAll('[data-page="home"]').forEach(i=>{i.classList.add("active")})});const C="016a30ce49a7789188b6fa9bad9963a6",u="https://api.themoviedb.org/3",p="https://image.tmdb.org/t/p",l={TRENDING_WEEK:"/trending/movie/week",TRENDING_DAY:"/trending/movie/day",POPULAR_MOVIES:"/movie/popular",UPCOMING_MOVIES:"/movie/upcoming",MOVIE_DETAILS:e=>`/movie/${e}`,MOVIE_VIDEOS:e=>`/movie/${e}/videos`,SEARCH_MOVIES:"/search/movie",GENRE_LIST:"/genre/movie/list",IMG_W500:"/w500",IMG_W780:"/w780",IMG_W1280:"/w1280",IMG_ORIGINAL:"/original"};async function g(e,t,o={}){try{return(await v.get(`${e}${t}`,{params:{api_key:C,language:"en-US",page:1,...o}})).data}catch(n){throw console.error("Error fetching data:",n),n}}const m=document.querySelector("#heroImg"),x=document.querySelector(".hero-h1"),H=document.querySelector(".hero-summary"),L=document.querySelector(".hero-button-watchTrailer");function R(e){return e.length>170?e.slice(0,170)+"...":e}function I(e){const t=window.matchMedia("(max-width: 767px)"),o=window.matchMedia("(min-width: 768px) and (max-width: 1279px)"),n=window.matchMedia("(min-width: 1280px)"),a=`${p}${l.IMG_W500}${e.backdrop_path}`,r=`${p}${l.IMG_W780}${e.backdrop_path}`,s=`${p}${l.IMG_W1280}${e.backdrop_path}`;t.matches?(m.style.backgroundImage=`url(${a})`,m.style.height="380px"):o.matches?(m.style.backgroundImage=`url(${r})`,m.style.height="432px"):n.matches&&(m.style.backgroundImage=`url(${s})`,m.style.height="720px"),m.setAttribute("aria-label",e.title),x.innerHTML=e.title,H.innerHTML=R(e.overview)}g(u,l.POPULAR_MOVIES,{page:1}).then(e=>{console.log(e);const t=Math.floor(Math.random()*20),o=e.results[t],n=o.id;I(o),g(u,l.MOVIE_VIDEOS(n),{page:1}).then(a=>{const r=a.results.find(s=>s.official===!0&&s.site==="YouTube"&&s.type==="Trailer");if(r){const s=`https://www.youtube.com/watch?v=${r.key}`;L.href=s,L.addEventListener("click",()=>{window.open(s,"_blank")})}else console.log("No official YouTube trailer found.")})});window.addEventListener("resize",()=>{g(u,l.POPULAR_MOVIES,{page:1}).then(e=>{const t=Math.floor(Math.random()*20),o=e.results[t];I(o)})});const U="016a30ce49a7789188b6fa9bad9963a6",V="https://api.themoviedb.org/3",b=document.getElementById("paginationNumbers"),M=document.getElementById("prevButton"),S=document.getElementById("nextButton"),w=document.getElementById("movieGrid");let d=1,h=1,W=1;async function Y(){await _(d),E(),M.addEventListener("click",()=>f(d-1)),S.addEventListener("click",()=>f(d+1))}async function K(){try{const e=await v.get(`${V}/search/movie`,{params:{api_key:U,page:W,query:"Love"}});return console.log("response.data",e.data),e.data}catch(e){throw console.error("Error fetching movies:",e),e}}async function _(e){try{const t=await K(e);console.log("load movie data",t),F(t.results),h=t.total_pages,console.log("totalPages",h),d=e,E()}catch(t){console.error("Failed to load movies:",t),Q("Failed to load movies. Please try again.")}}function F(e){e.forEach(t=>{const o=j(t);console.log("movieCard",o),w.appendChild(o)})}function j(e){const t=document.createElement("div");return t.className="movie-card",t.innerHTML=`
    <img src="https://image.tmdb.org/t/p/w500${e.poster_path}" alt="${e.title}">
    <h3>${e.title}</h3>
    <p>Release Date: ${e.release_date}</p>
    <p>Rating: ${e.vote_average}/10</p>
  `,console.log("card",t),t}function E(){b.innerHTML="";const e=Math.max(1,d-2),t=Math.min(h,e+4);for(let o=e;o<=t;o++){const n=document.createElement("button");n.textContent=o,n.classList.add("pagination-button"),o===d&&n.classList.add("active"),n.addEventListener("click",()=>f(o)),b.appendChild(n)}M.disabled=d===1,S.disabled=d===h}async function f(e){e>=1&&e<=h&&await _(e)}function Q(e){const t=document.createElement("div");t.className="error-message",t.textContent=e,w.appendChild(t)}Y();E();const y=document.querySelector("#content-poster"),z=document.querySelector("#movie-title"),J=document.querySelector("#date-of-release"),X=document.querySelector("#avarage-vote"),Z=document.querySelector("#popularity"),ee=document.querySelector("#count-vote"),te=document.querySelector("#genres");let $={};const oe=document.querySelector("#summary");g(u,l.GENRE_LIST).then(e=>{e.genres.forEach(t=>{$[t.id]=t.name})});g(u,l.UPCOMING_MOVIES,{page:1}).then(e=>{const t=new Date,o=e.results.filter(n=>new Date(n.release_date)>=t);if(o.length>0){const n=o[Math.floor(Math.random()*o.length)],a=`${p}${l.IMG_W1280}${n.backdrop_path}`;y.src=a,y.alt=n.title,y.title=n.overview,z.innerHTML=`${n.title}`;const r=new Date(n.release_date),s=r.getDate().toString().padStart(2,"0"),i=(r.getMonth()+1).toString().padStart(2,"0"),c=r.getFullYear();J.innerHTML=`${s}.${i}.${c}`,X.innerHTML=`${n.vote_average}`,Z.innerHTML=`${n.popularity}`,ee.innerHTML=`${n.vote_count}`;const k=n.genre_ids.map(T=>$[T]).join(", ");te.innerHTML=k,oe.innerHTML=`${n.overview}`}});
//# sourceMappingURL=main-pYYHyuhG.js.map
