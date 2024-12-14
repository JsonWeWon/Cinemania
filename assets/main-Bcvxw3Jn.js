import{a as k}from"./vendor-N5iQpiFS.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(a){if(a.ep)return;a.ep=!0;const r=o(a);fetch(a.href,r)}})();document.addEventListener("DOMContentLoaded",()=>{if(!document.querySelector("#library-container")){console.error("Element with ID 'library-container' not found!");return}const t=document.getElementById("default-content");document.getElementById("library-list");const o=JSON.parse(localStorage.getItem("myLibrary"))||[];o.length===0?t.style.display="block":(t.style.display="none",N(o));const n=document.getElementById("go-to-catalog");n&&n.addEventListener("click",()=>{window.location.href="catalog.html"})});function N(e){const t=document.getElementById("library-list");if(!t){console.error("Element with ID 'library-list' not found!");return}t.innerHTML="",e.forEach(o=>{const n=document.createElement("div");n.className="movie-item",n.innerHTML=`
      <h3>${o.title}</h3>
      <p>${o.description||"Açıklama mevcut değil"}</p>
    `,t.appendChild(n)})}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("theme-switch"),t=document.documentElement,o=document.body,n=localStorage.getItem("theme");n?(t.classList.add(n),o.classList.add(n),e.checked=n==="light-theme"):(t.classList.add("dark-theme"),o.classList.add("dark-theme"),e.checked=!1,localStorage.setItem("theme","dark-theme")),requestAnimationFrame(()=>{t.classList.add("theme-loaded")}),e.addEventListener("change",()=>{e.checked?(t.classList.remove("dark-theme"),t.classList.add("light-theme"),o.classList.remove("dark-theme"),o.classList.add("light-theme"),localStorage.setItem("theme","light-theme")):(t.classList.remove("light-theme"),t.classList.add("dark-theme"),o.classList.remove("light-theme"),o.classList.add("dark-theme"),localStorage.setItem("theme","dark-theme"))})});const x="016a30ce49a7789188b6fa9bad9963a6",D="https://api.themoviedb.org/3",P="https://image.tmdb.org/t/p",G="/trending/movie/week",H=document.querySelector("#weekly-movie-card");async function R(){try{return(await k.get(`${D}${G}`,{params:{api_key:x}})).data}catch(e){throw console.error("Error fetching movies:",e),e}}async function U(){try{const e=await R();console.log("data",e);const t=e.results.slice(0,3).map(o=>`
        <li class="catalog-item">
          <img class="catalog-img" src="${P}/w500${o.poster_path}" alt="${o.title}">
          <div class="catalog-info">
            <h2 class="catalog-title">${o.title}</h2>
          </div>
          <div class="catalog-stars">
            <span class="stars">STARS</span>
          </div>
        </li>
      `);H.innerHTML=t.join("")}catch(e){console.error("Error",e)}}document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".movie-card"),t={id:"123",title:"Red One",poster:"./img/card.png",vote:"6.8",votes:"317",popularity:"1231.7",genre:"Comedy Action Fantasy",about:"After Santa Claus (codename: Red One) is kidnapped, the North Pole's Head of Security must team up with the world's most infamous tracker in a globe-trotting, action-packed mission to save Christmas."};e.addEventListener("click",()=>{window.movieModal.show(t)}),e.style.cursor="pointer"});U();console.log("weeklyjs loaded");document.addEventListener("DOMContentLoaded",function(){const e=document.createElement("div");fetch("modal.html").then(t=>t.text()).then(t=>{e.innerHTML=t;const o=document.getElementById("teamModal"),n=document.getElementById("teamLink"),a=document.getElementById("closeModal");n.addEventListener("click",function(){o.classList.add("active"),document.body.style.overflow="hidden"});function r(){o.classList.remove("active"),document.body.style.overflow="auto"}a.addEventListener("click",r),o.addEventListener("click",function(i){i.target===o&&r()}),document.addEventListener("keydown",function(i){i.key==="Escape"&&r()})}).catch(t=>console.error("Modal yüklenirken bir hata oluştu:",t))});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".mobile-menu-btn"),t=document.querySelector(".mobile-menu"),o=document.querySelector(".mobile-menu-icon use"),n=document.body;function a(){const s=t.classList.contains("is-open"),l=o.getAttribute("href").split("#")[0];t.classList.toggle("is-open"),e.setAttribute("aria-expanded",!s),o.setAttribute("href",s?l+"#icon-menu":l+"#icon-close"),n.style.overflow=s?"":"hidden"}e&&t&&(e.addEventListener("click",l=>{l.stopPropagation(),a()}),document.querySelectorAll(".mobile-nav-link").forEach(l=>{l.addEventListener("click",()=>{a()})}),document.addEventListener("click",l=>{t.classList.contains("is-open")&&!l.target.closest(".mobile-menu")&&!l.target.closest(".mobile-menu-btn")&&a()}),t.addEventListener("click",l=>{l.stopPropagation()}),document.addEventListener("keydown",l=>{l.key==="Escape"&&t.classList.contains("is-open")&&a()}));const r=window.location.pathname;document.querySelectorAll(".nav-link, .mobile-nav-link").forEach(s=>{s.classList.remove("active")}),r.includes("catalog.html")?document.querySelectorAll('[data-page="catalog"]').forEach(s=>{s.classList.add("active")}):r.includes("mylibrary.html")?document.querySelectorAll('[data-page="library"]').forEach(s=>{s.classList.add("active")}):document.querySelectorAll('[data-page="home"]').forEach(s=>{s.classList.add("active")})});const V="016a30ce49a7789188b6fa9bad9963a6",v="https://api.themoviedb.org/3",g="https://image.tmdb.org/t/p",m={TRENDING_WEEK:"/trending/movie/week",TRENDING_DAY:"/trending/movie/day",POPULAR_MOVIES:"/movie/popular",UPCOMING_MOVIES:"/movie/upcoming",MOVIE_DETAILS:e=>`/movie/${e}`,MOVIE_VIDEOS:e=>`/movie/${e}/videos`,SEARCH_MOVIES:"/search/movie",GENRE_LIST:"/genre/movie/list",IMG_W500:"/w500",IMG_W780:"/w780",IMG_W1280:"/w1280",IMG_ORIGINAL:"/original"};async function L(e,t,o={}){try{return(await k.get(`${e}${t}`,{params:{api_key:V,language:"en-US",page:1,...o}})).data}catch(n){throw console.error("Error fetching data:",n),n}}const u=document.querySelector("#heroImg"),W=document.querySelector(".hero-h1"),F=document.querySelector(".hero-summary"),$=document.querySelector(".hero-button-watchTrailer");function Y(e){return e.length>170?e.slice(0,170)+"...":e}function j(e){const t=window.matchMedia("(max-width: 767px)"),o=window.matchMedia("(min-width: 768px) and (max-width: 1279px)"),n=window.matchMedia("(min-width: 1280px)"),a=`${g}${m.IMG_W500}${e.backdrop_path}`,r=`${g}${m.IMG_W780}${e.backdrop_path}`,i=`${g}${m.IMG_W1280}${e.backdrop_path}`;t.matches?(u.style.backgroundImage=`url(${a})`,u.style.height="380px"):o.matches?(u.style.backgroundImage=`url(${r})`,u.style.height="432px"):n.matches&&(u.style.backgroundImage=`url(${i})`,u.style.height="720px"),u.setAttribute("aria-label",e.title),W.innerHTML=e.title,F.innerHTML=Y(e.overview)}L(v,m.POPULAR_MOVIES,{page:1}).then(e=>{console.log(e);const t=Math.floor(Math.random()*20),o=e.results[t],n=o.id;j(o),L(v,m.MOVIE_VIDEOS(n),{page:1}).then(a=>{const r=a.results.find(i=>i.official===!0&&i.site==="YouTube"&&i.type==="Trailer");if(r){const i=`https://www.youtube.com/watch?v=${r.key}`;$.href=i,$.addEventListener("click",()=>{window.open(i,"_blank")})}else console.log("No official YouTube trailer found.")})});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".hero-button-moreDetails"),t={id:"hero_123",title:"Ghosted",poster:"./img/hero-desktop.png",vote:"7.3",votes:"486",popularity:"1654.8",genre:"Action Romance Comedy",about:"Salt-of-the-earth Cole falls head over heels for enigmatic Sadie — but then makes the shocking discovery that she's a secret agent. Before they can decide on a second date, Cole and Sadie are swept away on an international adventure to save the world."};e.addEventListener("click",()=>{window.movieModal.show(t)})});console.log("hero js yüklendi");document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".modal-details"),t=e.querySelector(".modal-details__close"),o=e.querySelector(".modal-details__library-btn");let n=null;function a(){e.classList.remove("active"),document.body.style.overflow="auto"}t.addEventListener("click",a),e.addEventListener("click",c=>{c.target===e&&a()}),document.addEventListener("keydown",c=>{c.key==="Escape"&&e.classList.contains("active")&&a()});function r(c){return JSON.parse(localStorage.getItem("movieLibrary")||"[]").includes(c)}function i(c){const d=r(c);o.textContent=d?"Remove from my library":"Add to my library",o.dataset.action=d?"remove":"add"}function s(c){const d=JSON.parse(localStorage.getItem("movieLibrary")||"[]"),_=d.indexOf(c);_===-1?d.push(c):d.splice(_,1),localStorage.setItem("movieLibrary",JSON.stringify(d)),i(c)}o.addEventListener("click",()=>{n&&s(n)});function l(c){n=c.id,e.querySelector(".modal-details__image").src=c.poster,e.querySelector(".modal-details__image").alt=c.title,e.querySelector(".modal-details__title").textContent=c.title,e.querySelector(".modal-details__vote").textContent=c.vote,e.querySelector(".modal-details__votes").textContent=c.votes,e.querySelector(".modal-details__popularity").textContent=c.popularity,e.querySelector(".modal-details__genre").textContent=c.genre,e.querySelector(".modal-details__about-text").textContent=c.about,i(c.id),e.classList.add("active"),document.body.style.overflow="hidden"}window.movieModal={show:l,close:a}});const K="016a30ce49a7789188b6fa9bad9963a6",Q="https://api.themoviedb.org/3",T=document.getElementById("paginationNumbers"),p=document.getElementById("prevButton"),f=document.getElementById("nextButton"),q=document.getElementById("movie-list"),S=document.querySelector(".error-message");let y=1,h=1,B="";const J={28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",99:"Documentary",18:"Drama",10751:"Family",14:"Fantasy",36:"History",27:"Horror",10402:"Music",9648:"Mystery",10749:"Romance",878:"Science Fiction",10770:"TV Movie",53:"Thriller",10752:"War",37:"Western"};function z(e){return!e||!Array.isArray(e)?"":e.map(n=>J[n]||"Unknown").slice(0,2).join(", ")}function X(e){return e?e.split("-")[0]:""}function Z(){I(1),p.addEventListener("click",()=>w(y-1)),f.addEventListener("click",()=>w(y+1))}function C(e){B=e.trim(),I(1)}async function I(e){try{const t=await ee(e,B);te(t.results),y=t.page,h=t.total_pages,oe()}catch(t){console.error("Failed to load movies:",t),O("Failed to load movies. Please try again.")}}async function ee(e,t){try{let o="/trending/movie/week",n={api_key:K,page:e};return t&&(o="/search/movie",n.query=t),(await k.get(`${Q}${o}`,{params:n})).data}catch(o){throw console.error("Error fetching movies:",o),o}}function te(e){if(q.innerHTML="",S.style.display="none",!e||e.length===0){O("No movies found.");return}e.forEach(t=>{const o=document.createElement("div");o.className="catalog-item",o.style.backgroundImage=`url(https://image.tmdb.org/t/p/w500${t.poster_path})`;const n=z(t.genre_ids),a=X(t.release_date),r=`${n}${a?` | ${a}`:""}`;o.innerHTML=`
      <div class="catalog-card-info-container">
        <h3 class="catalog-card-title">${t.title}</h3>
        <p class="catalog-card-description">${r}</p>
        <p class="rating">⭐ ${t.vote_average.toFixed(1)}</p>
      </div>
    `,q.appendChild(o)})}function oe(){if(T.innerHTML="",h<2){p.style.display="none",f.style.display="none";return}else p.style.display="inline-block",f.style.display="inline-block";const e=Math.max(1,y-2),t=Math.min(h,e+4);for(let o=e;o<=t;o++){const n=document.createElement("button");n.textContent=o,n.classList.add("pagination-button"),o===y&&n.classList.add("active"),n.addEventListener("click",()=>w(o)),T.appendChild(n)}p.disabled=y===1,f.disabled=y===h}function O(e){S.textContent=e,S.style.display="block"}async function w(e){e>=1&&e<=h&&await I(e)}const ne=document.getElementById("search-form"),b=document.getElementById("search-input"),E=document.getElementById("clear-button");b.addEventListener("input",()=>{b.value.trim()!==""?E.style.display="inline":E.style.display="none"});E.addEventListener("click",()=>{b.value="",E.style.display="none",C("")});ne.addEventListener("submit",e=>{e.preventDefault();const t=b.value.trim();C(t)});const M=document.querySelector("#content-poster"),ae=document.querySelector("#movie-title"),re=document.querySelector("#date-of-release"),se=document.querySelector("#avarage-vote"),ie=document.querySelector("#popularity"),ce=document.querySelector("#count-vote"),le=document.querySelector("#genres");let A={};const de=document.querySelector("#summary");L(v,m.GENRE_LIST).then(e=>{e.genres.forEach(t=>{A[t.id]=t.name})});const me=()=>{L(v,m.UPCOMING_MOVIES,{page:1}).then(e=>{const t=new Date,o=e.results.filter(n=>new Date(n.release_date)>=t);if(o.length>0){const n=o[Math.floor(Math.random()*o.length)],a=`${g}${m.IMG_W1280}${n.backdrop_path}`;M.src=a,M.alt=n.title,M.title=n.overview,ae.innerHTML=`${n.title}`;const r=new Date(n.release_date),i=r.getDate().toString().padStart(2,"0"),s=(r.getMonth()+1).toString().padStart(2,"0"),l=r.getFullYear();re.innerHTML=`${i}.${s}.${l}`,se.innerHTML=`${n.vote_average}`,ie.innerHTML=`${n.popularity}`,ce.innerHTML=`${n.vote_count}`;const c=n.genre_ids.map(d=>A[d]).join(", ");le.innerHTML=c,de.innerHTML=`${n.overview}`}})};me();console.log("upcoming js yüklendi");document.getElementById("movie-list");document.querySelector(".error-message");document.addEventListener("DOMContentLoaded",()=>{Z()});document.addEventListener("DOMContentLoaded",()=>{console.log("Trailer modal script loaded");const e=document.querySelector(".modal-trailer"),t=e.querySelector(".modal-trailer__close"),o=document.querySelector(".hero-button-watchTrailer"),n=e.querySelector(".modal-trailer__video");console.log("Elements found:",{modal:!!e,closeBtn:!!t,watchTrailerBtn:!!o,iframe:!!n});function a(){const s=n.src;n.src=s}function r(){console.log("Closing modal"),e.classList.remove("active"),document.body.style.overflow="auto",a()}function i(){console.log("Opening modal"),e.classList.add("active"),document.body.style.overflow="hidden"}o&&o.addEventListener("click",s=>{console.log("Watch trailer button clicked"),s.preventDefault(),i()}),t&&t.addEventListener("click",s=>{console.log("Close button clicked"),s.preventDefault(),r()}),e&&e.addEventListener("click",s=>{s.target===e&&(console.log("Clicked outside modal"),r())}),document.addEventListener("keydown",s=>{s.key==="Escape"&&e.classList.contains("active")&&(console.log("Escape key pressed"),r())}),window.trailerModal={open:i,close:r}});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".scroll-to-top"),t=100;function o(){window.scrollY>t?e.classList.add("visible"):e.classList.remove("visible")}function n(){window.scrollTo({top:0,behavior:"smooth"})}window.addEventListener("scroll",o),e.addEventListener("click",n),o()});
//# sourceMappingURL=main-Bcvxw3Jn.js.map
