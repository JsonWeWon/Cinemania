import{a as R}from"./vendor-N5iQpiFS.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();const j="016a30ce49a7789188b6fa9bad9963a6",L="https://api.themoviedb.org/3",E="https://image.tmdb.org/t/p",v={TRENDING_WEEK:"/trending/movie/week",TRENDING_DAY:"/trending/movie/day",POPULAR_MOVIES:"/movie/popular",UPCOMING_MOVIES:"/movie/upcoming",MOVIE_DETAILS:e=>`/movie/${e}`,MOVIE_VIDEOS:e=>`/movie/${e}/videos`,SEARCH_MOVIES:"/search/movie",GENRE_LIST:"/genre/movie/list",IMG_W500:"/w500",IMG_W780:"/w780",IMG_W1280:"/w1280",IMG_ORIGINAL:"/original"};async function w(e,t,n={}){try{return(await R.get(`${e}${t}`,{params:{api_key:j,language:"en-US",page:1,...n}})).data}catch(o){throw console.error("Error fetching data:",o),o}}document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".hero"),t=document.querySelector(".modal-trailer"),n=t.querySelector(".modal-trailer__close"),o=document.querySelector(".hero-button-watchTrailer"),r=t.querySelector(".modal-trailer__video");function a(){const i=r.src;r.src=i}function s(){console.log("Closing modal"),t.classList.remove("active"),document.body.style.overflow="auto",a()}function c(){console.log("Opening modal"),t.classList.add("active"),document.body.style.overflow="hidden",console.log("video api ",e.dataset.movieid),w(L,`/movie/${e.dataset.movieid}/videos`,{page:1}).then(i=>{console.log("VIDEO:",i);const p=i.results.find(m=>m.official===!0&&m.site==="YouTube"&&m.type==="Trailer");if(p){const m=`https://www.youtube.com/embed/${p.key}`;console.log(r.src),r.src=m,console.log(r.src)}else console.log("No official YouTube trailer found.")})}o&&o.addEventListener("click",i=>{console.log("Watch trailer button clicked"),i.preventDefault(),c()}),n&&n.addEventListener("click",i=>{console.log("Close button clicked"),i.preventDefault(),s()}),t&&t.addEventListener("click",i=>{i.target===t&&(console.log("Clicked outside modal"),s())}),document.addEventListener("keydown",i=>{i.key==="Escape"&&t.classList.contains("active")&&(console.log("Escape key pressed"),s())}),window.trailerModal={open:c,close:s}});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("genre-dropdown-container"),t=document.getElementById("load-more-container"),n=document.getElementById("library-list"),o=document.getElementById("default-content"),r=document.getElementById("genre-dropdown"),a=10;let s=1;const c=JSON.parse(localStorage.getItem("myLibrary"))||[];if(c.length===0){o.style.display="block",e.style.display="none",t.style.display="none";return}o.style.display="none",e.style.display="block",C(c.slice(0,a)),c.length>a?t.style.display="block":t.style.display="none",r.addEventListener("change",i=>{const p=i.target.value,m=p==="all"?c.slice(0,s*a):c.filter(l=>l.genre_ids.includes(parseInt(p)));m.length===0?(o.style.display="block",n.innerHTML="",e.style.display="block",t.style.display="none"):(o.style.display="none",C(m.slice(0,s*a)),t.style.display=m.length>s*a?"block":"none")}),document.getElementById("load-more").addEventListener("click",()=>{s++;const i=c.slice(0,s*a);C(i),i.length>=c.length&&(t.style.display="none")})});function C(e){const t=document.getElementById("library-list");t.innerHTML="",e.forEach(n=>{const o=document.createElement("div");o.className="movie-item",o.innerHTML=`
      <img src="https://image.tmdb.org/t/p/w500${n.poster_path}" alt="${n.title}" class="movie-poster">
      <div class="catalog-card-info-container">
        <h3 class="catalog-card-title">${n.title}</h3>
        <p class="catalog-card-description">${J(n.genre_ids)} | ${n.release_date?n.release_date.split("-")[0]:"Unknown"}</p>
        <p class="rating">⭐ ${n.vote_average.toFixed(1)}</p>
      </div>
    `,o.addEventListener("click",()=>{window.movieModal.show(n.id)}),t.appendChild(o)})}function J(e){const t={28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",99:"Documentary",18:"Drama",10751:"Family",14:"Fantasy",36:"History",27:"Horror",10402:"Music",9648:"Mystery",10749:"Romance",878:"Science Fiction",10770:"TV Movie",53:"Thriller",10752:"War",37:"Western"};return!e||!Array.isArray(e)?"":e.map(o=>t[o]||"Unknown").slice(0,2).join(", ")}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("theme-switch"),t=document.documentElement,n=document.body,o=localStorage.getItem("theme");o?(t.classList.add(o),n.classList.add(o),e.checked=o==="light-theme"):(t.classList.add("dark-theme"),n.classList.add("dark-theme"),e.checked=!1,localStorage.setItem("theme","dark-theme")),requestAnimationFrame(()=>{t.classList.add("theme-loaded")}),e.addEventListener("change",()=>{e.checked?(t.classList.remove("dark-theme"),t.classList.add("light-theme"),n.classList.remove("dark-theme"),n.classList.add("light-theme"),localStorage.setItem("theme","light-theme")):(t.classList.remove("light-theme"),t.classList.add("dark-theme"),n.classList.remove("light-theme"),n.classList.add("dark-theme"),localStorage.setItem("theme","dark-theme"))})});document.addEventListener("DOMContentLoaded",function(){const e=document.createElement("div");fetch("modal.html").then(t=>t.text()).then(t=>{e.innerHTML=t;const n=document.getElementById("teamModal"),o=document.getElementById("teamLink"),r=document.getElementById("closeModal");o.addEventListener("click",function(){n.classList.add("active"),document.body.style.overflow="hidden"});function a(){n.classList.remove("active"),document.body.style.overflow="auto"}r.addEventListener("click",a),n.addEventListener("click",function(s){s.target===n&&a()}),document.addEventListener("keydown",function(s){s.key==="Escape"&&a()})}).catch(t=>console.error("Modal yüklenirken bir hata oluştu:",t))});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".mobile-menu-btn"),t=document.querySelector(".mobile-menu"),n=document.querySelector(".mobile-menu-icon use"),o=document.body;function r(){const c=t.classList.contains("is-open"),i=n.getAttribute("href").split("#")[0];t.classList.toggle("is-open"),e.setAttribute("aria-expanded",!c),n.setAttribute("href",c?i+"#icon-menu":i+"#icon-close"),o.style.overflow=c?"":"hidden"}e&&t&&(e.addEventListener("click",i=>{i.stopPropagation(),r()}),document.querySelectorAll(".mobile-nav-link").forEach(i=>{i.addEventListener("click",()=>{r()})}),document.addEventListener("click",i=>{t.classList.contains("is-open")&&!i.target.closest(".mobile-menu")&&!i.target.closest(".mobile-menu-btn")&&r()}),t.addEventListener("click",i=>{i.stopPropagation()}),document.addEventListener("keydown",i=>{i.key==="Escape"&&t.classList.contains("is-open")&&r()}));const a=window.location.pathname;document.querySelectorAll(".nav-link, .mobile-nav-link").forEach(c=>{c.classList.remove("active")}),a.includes("catalog.html")?document.querySelectorAll('[data-page="catalog"]').forEach(c=>{c.classList.add("active")}):a.includes("mylibrary.html")?document.querySelectorAll('[data-page="library"]').forEach(c=>{c.classList.add("active")}):document.querySelectorAll('[data-page="home"]').forEach(c=>{c.classList.add("active")})});const K=document.querySelector("#weekly-movie-card"),Z={28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",99:"Documentary",18:"Drama",10751:"Family",14:"Fantasy",36:"History",27:"Horror",10402:"Music",9648:"Mystery",10749:"Romance",878:"Science Fiction",10770:"TV Movie",53:"Thriller",10752:"War",37:"Western"};function z(e){return!e||!Array.isArray(e)?"":e.map(o=>Z[o]||"Unknown").slice(0,2).join(", ")}function Q(e){return e?e.split("-")[0]:""}async function X(){try{const t=(await w(L,v.TRENDING_WEEK)).results.slice(0,3),n=t.map(o=>{const r=z(o.genre_ids),a=Q(o.release_date),s=`${r}${a?` | ${a}`:""}`;return`
                <li class="catalog-item" id="weekly-movie-${o.id}">
                    <img class="catalog-img" src="${E}/w500${o.poster_path}" alt="${o.title}">
      <div class="catalog-card-info-container weekly-font">
            <h2 class="weekly-card-title">${o.title}</h2>
            <p class="weekly-card-text">${s}</p>
            <p class="weekly-card-rating">⭐ ${o.vote_average.toFixed(1)}</p>
        </div>
                </li>
            `});K.innerHTML=n.join(""),t.forEach(o=>{document.getElementById(`weekly-movie-${o.id}`).addEventListener("click",()=>{window.movieModal.show(o.id)})})}catch(e){console.error("Error loading weekly movies:",e)}}X();const T=document.querySelector(".upcoming__library-btn"),O=document.querySelector("#content-poster"),ee=document.querySelector("#movie-title"),te=document.querySelector("#date-of-release"),ne=document.querySelector("#avarage-vote"),oe=document.querySelector("#popularity"),re=document.querySelector("#count-vote"),ae=document.querySelector("#genres"),ie=document.querySelector("#summary");let U={},N=null;w(L,v.GENRE_LIST).then(e=>{e.genres.forEach(t=>{U[t.id]=t.name})});function se(e){return(JSON.parse(localStorage.getItem("myLibrary"))||[]).some(n=>n.id===e)}function P(e){const t=se(e);T.textContent=t?"Remove from my library":"Add to my library",T.dataset.action=t?"remove":"add"}function ce(e){const t=JSON.parse(localStorage.getItem("myLibrary"))||[],n=t.findIndex(o=>o.id===e.id);n===-1?t.push(e):t.splice(n,1),localStorage.setItem("myLibrary",JSON.stringify(t)),P(e.id)}const le=async()=>{try{const e=await w(L,v.UPCOMING_MOVIES,{page:1}),t=new Date,n=e.results.filter(o=>new Date(o.release_date)>=t);if(n.length>0){const o=n[Math.floor(Math.random()*n.length)];N=o.id,O.src=`${E}${v.IMG_W1280}${o.backdrop_path}`,O.alt=o.title,ee.textContent=o.title,te.textContent=new Date(o.release_date).toLocaleDateString("en-GB"),ne.textContent=o.vote_average,oe.textContent=o.popularity,re.textContent=o.vote_count,ae.textContent=o.genre_ids.map(r=>U[r]).join(", "),ie.textContent=o.overview,P(N),T.addEventListener("click",()=>{ce(o)})}}catch(e){console.error("Error fetching upcoming movies:",e)}};le();const de=document.querySelector(".loader");window.onload=()=>{de.classList.remove("loader--shown"),document.body.removeAttribute("style")};function me(){const e=window.innerWidth-document.documentElement.clientWidth;document.body.style.overflow="hidden",document.body.style.paddingRight=`${e}px`}me();document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".scroll-to-top"),t=100;function n(){window.scrollY>t?e.classList.add("visible"):e.classList.remove("visible")}function o(){window.scrollTo({top:0,behavior:"smooth"})}window.addEventListener("scroll",n),e.addEventListener("click",o),n()});const ue=document.querySelector("#heroImg"),D=document.querySelector(".hero-image-container"),ye=document.querySelector(".hero-h1"),pe=document.querySelector(".hero-rating-stars"),ge=document.querySelector(".hero-summary"),he=document.querySelector(".hero-button-moreDetails");document.querySelector(".hero-button-watchTrailer");const fe=document.querySelector(".hero");let x=null;function ve(e){return e.length>170?e.slice(0,170)+"...":e}let y;function M(e){const t=`${E}/w500${e.backdrop_path}`,n=`${E}/w780${e.backdrop_path}`,o=`${E}/w1280${e.backdrop_path}`;y=document.createElement("img"),y?y.classList.add("hero-image-itself"):console.error("Image element not found."),y.alt=e.title,window.matchMedia("(max-width: 767px)").matches?y.src=t:window.matchMedia("(min-width: 768px) and (max-width: 1279px)").matches?y.src=n:y.src=o,D.innerHTML="",D.appendChild(y),ue.setAttribute("aria-label",e.title),ye.innerHTML=e.title,ge.innerHTML=ve(e.overview),x=e.id}let h;w(L,v.POPULAR_MOVIES,{page:1}).then(e=>{if(e.results&&e.results.length>0){const t=Math.floor(Math.random()*20);h=e.results[t],fe.dataset.movieid=h.id;const n=h.vote_average;be(n,pe),M(h)}else console.error("No movies found for hero section.")});he.addEventListener("click",()=>{x&&window.movieModal.show(x)});window.addEventListener("resize",()=>{y&&(window.innerWidth<=768||window.innerWidth<=1280,M(h))});const Le=`
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M13.852 16.875C13.7336 16.8755 13.6181 16.8386 13.5219 16.7696L9.00048 13.4916L4.47903 16.7696C4.38243 16.8396 4.26606 16.8772 4.14673 16.8767C4.0274 16.8763 3.91129 16.8379 3.81521 16.7672C3.71912 16.6964 3.64803 16.5969 3.61221 16.4831C3.57639 16.3693 3.5777 16.247 3.61594 16.134L5.37938 10.9108L0.809069 7.77661C0.710073 7.7088 0.635356 7.61111 0.595836 7.49781C0.556316 7.3845 0.554063 7.26154 0.589407 7.14686C0.624751 7.03219 0.695839 6.93183 0.792285 6.86044C0.888732 6.78904 1.00548 6.75036 1.12548 6.75005H6.76384L8.4654 1.51352C8.50205 1.40047 8.57358 1.30193 8.6697 1.23204C8.76583 1.16216 8.88163 1.12451 9.00048 1.12451C9.11932 1.12451 9.23512 1.16216 9.33125 1.23204C9.42738 1.30193 9.4989 1.40047 9.53555 1.51352L11.2371 6.75181H16.8755C16.9956 6.75175 17.1126 6.79016 17.2094 6.86141C17.3061 6.93267 17.3775 7.03303 17.413 7.14778C17.4486 7.26254 17.4465 7.38568 17.407 7.49915C17.3675 7.61262 17.2928 7.71047 17.1936 7.77837L12.6216 10.9108L14.384 16.1325C14.4125 16.2171 14.4205 16.3072 14.4074 16.3955C14.3942 16.4837 14.3603 16.5676 14.3083 16.6401C14.2563 16.7127 14.1879 16.7718 14.1085 16.8127C14.0292 16.8535 13.9413 16.8749 13.852 16.875Z" fill="url(#paint0_linear_405_1426)"/>
  <defs>
    <linearGradient id="paint0_linear_405_1426" x1="2.62549" y1="2.25006" x2="13.8755" y2="17.2501" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F84119"/>
      <stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
    </linearGradient>
  </defs>
</svg>`,we=`
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_405_1428)" stroke-linejoin="round"/>
  <path d="M9 1.6875V12.7969L4.14844 16.3125L6.04688 10.6875L1.125 7.3125H7.17188L9 1.6875Z" fill="url(#paint1_linear_405_1428)"/>
  <defs>
    <linearGradient id="paint0_linear_405_1428" x1="3.375" y1="2.625" x2="14.625" y2="16.5" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F84119"/>
      <stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
    </linearGradient>
    <linearGradient id="paint1_linear_405_1428" x1="5.0625" y1="1.6875" x2="5.0625" y2="16.3125" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F84119"/>
      <stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
    </linearGradient>
  </defs>
</svg>`,Ee=`
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_405_1431)" stroke-linejoin="round"/>
  <defs>
    <linearGradient id="paint0_linear_405_1431" x1="3.375" y1="2.625" x2="13.5" y2="16.5" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F84119"/>
      <stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
    </linearGradient>
  </defs>
</svg>`;function be(e,t){if(e<=0||e>=10){console.error("Rating must be between 0 and 10");return}const n=e/2;t.innerHTML="";const o=Math.floor(n),r=n%1>=.5?1:0,a=5-o-r;for(let s=0;s<o;s++){const c=document.createElement("div");c.innerHTML=Le,t.appendChild(c.firstElementChild)}if(r){const s=document.createElement("div");s.innerHTML=we,t.appendChild(s.firstElementChild)}for(let s=0;s<a;s++){const c=document.createElement("div");c.innerHTML=Ee,t.appendChild(c.firstElementChild)}}document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".modal-details"),t=e.querySelector(".modal-details__close"),n=e.querySelector(".modal-details__library-btn");let o=null;const r={28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",99:"Documentary",18:"Drama",10751:"Family",14:"Fantasy",36:"History",27:"Horror",10402:"Music",9648:"Mystery",10749:"Romance",878:"Science Fiction",10770:"TV Movie",53:"Thriller",10752:"War",37:"Western"};function a(){e.classList.remove("active"),document.body.style.overflow="auto"}t.addEventListener("click",a),e.addEventListener("click",l=>{l.target===e&&a()}),document.addEventListener("keydown",l=>{l.key==="Escape"&&e.classList.contains("active")&&a()});function s(l){return(JSON.parse(localStorage.getItem("myLibrary"))||[]).some(g=>g.id===l)}function c(l){const d=s(l);n.textContent=d?"Remove from my library":"Add to my library",n.dataset.action=d?"remove":"add"}function i(l){const d=JSON.parse(localStorage.getItem("myLibrary"))||[],g=d.findIndex(u=>u.id===l.id);l.genres&&!l.genre_ids&&(l.genre_ids=l.genres.map(u=>u.id)),l.genre_ids&&!l.genres&&(l.genres=l.genre_ids.map(u=>({id:u,name:r[u]||"Unknown"}))),g===-1?d.push(l):d.splice(g,1),localStorage.setItem("myLibrary",JSON.stringify(d)),c(l.id)}n.addEventListener("click",async()=>{if(o){const l=await p(o);i(l)}});async function p(l){const d="016a30ce49a7789188b6fa9bad9963a6",g="https://api.themoviedb.org/3";try{const u=await fetch(`${g}/movie/${l}?api_key=${d}&language=en-US`);if(!u.ok)throw new Error("Failed to fetch movie details");return await u.json()}catch(u){return console.error("Error fetching movie details:",u),null}}async function m(l){const d=await p(l);d&&(o=d.id,e.querySelector(".modal-details__image").src=`https://image.tmdb.org/t/p/w500${d.poster_path}`,e.querySelector(".modal-details__image").alt=d.title,e.querySelector(".modal-details__title").textContent=d.title,e.querySelector(".modal-details__vote").textContent=d.vote_average.toFixed(1),e.querySelector(".modal-details__votes").textContent=d.vote_count,e.querySelector(".modal-details__popularity").textContent=d.popularity.toFixed(1),e.querySelector(".modal-details__genre").textContent=d.genres.map(g=>g.name).join(", "),e.querySelector(".modal-details__about-text").textContent=d.overview,c(d.id),e.classList.add("active"),document.body.style.overflow="hidden")}window.movieModal={show:m,close:a}});const Me="016a30ce49a7789188b6fa9bad9963a6",_e="https://api.themoviedb.org/3",F=document.getElementById("paginationNumbers"),_=document.getElementById("prevButton"),S=document.getElementById("nextButton"),H=document.getElementById("movie-list"),A=document.querySelector(".error-message");let f=1,b=1,W="";const Se={28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",99:"Documentary",18:"Drama",10751:"Family",14:"Fantasy",36:"History",27:"Horror",10402:"Music",9648:"Mystery",10749:"Romance",878:"Science Fiction",10770:"TV Movie",53:"Thriller",10752:"War",37:"Western"};function ke(e){return!e||!Array.isArray(e)?"":e.map(o=>Se[o]||"Unknown").slice(0,2).join(", ")}function Ie(e){return e?e.split("-")[0]:""}function Ce(){G(1),_.addEventListener("click",()=>q(f-1)),S.addEventListener("click",()=>q(f+1))}function V(e){W=e.trim(),G(1)}async function G(e){try{const t=await $e(e,W);Te(t.results),f=t.page,b=t.total_pages,xe()}catch(t){console.error("Failed to load movies:",t),Y("Failed to load movies. Please try again.")}}async function $e(e,t){try{let n="/trending/movie/week",o={api_key:Me,page:e};return t&&(n="/search/movie",o.query=t),(await R.get(`${_e}${n}`,{params:o})).data}catch(n){throw console.error("Error fetching movies:",n),n}}function Te(e){if(H.innerHTML="",A.style.display="none",!e||e.length===0){Y("No movies found.");return}e.forEach(t=>{const n=document.createElement("div");n.className="catalog-item",n.style.backgroundImage=`url(https://image.tmdb.org/t/p/w500${t.poster_path})`;const o=ke(t.genre_ids),r=Ie(t.release_date),a=`${o}${r?` | ${r}`:""}`;n.innerHTML=`
      <div class="catalog-card-info-container">
        <h3 class="catalog-card-title">${t.title}</h3>
        <p class="catalog-card-description">${a}</p>
        <p class="rating">⭐ ${t.vote_average.toFixed(1)}</p>
      </div>
    `,H.appendChild(n),n.addEventListener("click",()=>{window.movieModal.show(t.id)})})}function xe(){if(F.innerHTML="",b<2){_.style.display="none",S.style.display="none";return}else _.style.display="inline-block",S.style.display="inline-block";const e=Math.max(1,f-2),t=Math.min(b,e+4);for(let n=e;n<=t;n++){const o=document.createElement("button");o.textContent=n,o.classList.add("pagination-button"),n===f&&o.classList.add("active"),o.addEventListener("click",()=>q(n)),F.appendChild(o)}_.disabled=f===1,S.disabled=f===b}function Y(e){A.textContent=e,A.style.display="block"}async function q(e){e>=1&&e<=b&&await G(e)}const Ae=document.getElementById("search-form"),k=document.getElementById("search-input"),I=document.getElementById("clear-button"),qe=document.getElementById("movie-list");k.addEventListener("input",()=>{k.value.trim()!==""?I.style.display="inline":I.style.display="none"});I.addEventListener("click",()=>{k.value="",I.style.display="none",V("")});Ae.addEventListener("submit",e=>{e.preventDefault();const t=k.value.trim();t&&(V(t),Be())});function Be(){qe.querySelectorAll(".catalog-item").forEach(t=>{const n=t.id.split("-")[2];t.addEventListener("click",()=>{window.movieModal.show(n)})})}const B=document.getElementById("movie-list"),$=document.querySelector(".error-message"),Ge={28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",99:"Documentary",18:"Drama",10751:"Family",14:"Fantasy",36:"History",27:"Horror",10402:"Music",9648:"Mystery",10749:"Romance",878:"Science Fiction",10770:"TV Movie",53:"Thriller",10752:"War",37:"Western"};function Oe(e){return!e||!Array.isArray(e)?"":e.map(o=>Ge[o]||"Unknown").slice(0,2).join(", ")}function Ne(e){return e?e.split("-")[0]:""}function De(e){B.innerHTML="",e.forEach(t=>{const n=document.createElement("div");n.className="catalog-item",n.id=`catalog-movie-${t.id}`,n.style.backgroundImage=`url(https://image.tmdb.org/t/p/w500${t.poster_path})`;const o=Oe(t.genre_ids),r=Ne(t.release_date),a=`${o}${r?` | ${r}`:""}`;n.innerHTML=`
            <div class="catalog-card-info-container">
                <h3 class="catalog-card-title">${t.title}</h3>
                <p class="catalog-card-description">${a}</p>
                <p class="rating">⭐ ${t.vote_average.toFixed(1)}</p>
            </div>
        `,B.appendChild(n),n.addEventListener("click",()=>{window.movieModal.show(t.id)})})}async function Fe(){try{const e=await w(L,v.TRENDING_WEEK);e.results&&e.results.length>0?(De(e.results),$.style.display="none"):(B.innerHTML="",$.style.display="block")}catch(e){console.error("Error fetching movies:",e),$.style.display="block"}}document.addEventListener("DOMContentLoaded",()=>{Ce(),Fe()});
//# sourceMappingURL=main-pGvUU-it.js.map