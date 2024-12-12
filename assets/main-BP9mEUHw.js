import{a as v}from"./vendor-N5iQpiFS.js";import{f as m,I as h,E as l,B as u}from"./search-DMmt71Gz.js";document.addEventListener("DOMContentLoaded",()=>{if(!document.querySelector("#library-container")){console.error("Element with ID 'library-container' not found!");return}const t=document.getElementById("default-content");document.getElementById("library-list");const o=JSON.parse(localStorage.getItem("myLibrary"))||[];o.length===0?t.style.display="block":(t.style.display="none",E(o));const n=document.getElementById("go-to-catalog");n&&n.addEventListener("click",()=>{window.location.href="catalog.html"})});function E(e){const t=document.getElementById("library-list");if(!t){console.error("Element with ID 'library-list' not found!");return}t.innerHTML="",e.forEach(o=>{const n=document.createElement("div");n.className="movie-item",n.innerHTML=`
      <h3>${o.title}</h3>
      <p>${o.description||"Açıklama mevcut değil"}</p>
    `,t.appendChild(n)})}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("theme-switch"),t=document.body,o=localStorage.getItem("theme");o?(t.classList.add(o),e.checked=o==="light-theme"):(t.classList.add("dark-theme"),e.checked=!1),e.addEventListener("change",()=>{e.checked?(t.classList.remove("dark-theme"),t.classList.add("light-theme"),localStorage.setItem("theme","light-theme")):(t.classList.remove("light-theme"),t.classList.add("dark-theme"),localStorage.setItem("theme","dark-theme"))})});const M="016a30ce49a7789188b6fa9bad9963a6",S="https://api.themoviedb.org/3",I="https://image.tmdb.org/t/p",w="/trending/movie/week",k=document.querySelector("#weekly-movie-card");async function $(){try{return(await v.get(`${S}${w}`,{params:{api_key:M}})).data}catch(e){throw console.error("Error fetching movies:",e),e}}async function _(){try{const e=await $();console.log("data",e);const t=e.results.slice(0,3).map(o=>`
        <li class="catalog-item">
          <img class="catalog-img" src="${I}/w500${o.poster_path}" alt="${o.title}">
          <div class="catalog-info">
            <h2 class="catalog-title">${o.title}</h2>
          </div>
          <div class="catalog-stars">
            <span class="stars">STARS</span>
          </div>
        </li>
      `);k.innerHTML=t.join("")}catch(e){console.error("Error",e)}}_();console.log("weeklyjs loaded");document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".mobile-menu-btn"),t=document.querySelector(".mobile-menu"),o=document.querySelector(".mobile-menu-icon use"),n=document.body;function s(){const r=t.classList.contains("is-open"),a=o.getAttribute("href").split("#")[0];t.classList.toggle("is-open"),e.setAttribute("aria-expanded",!r),o.setAttribute("href",r?a+"#icon-menu":a+"#icon-close"),n.style.overflow=r?"":"hidden"}e&&t&&(e.addEventListener("click",a=>{a.stopPropagation(),s()}),document.querySelectorAll(".mobile-nav-link").forEach(a=>{a.addEventListener("click",()=>{s()})}),document.addEventListener("click",a=>{t.classList.contains("is-open")&&!a.target.closest(".mobile-menu")&&!a.target.closest(".mobile-menu-btn")&&s()}),t.addEventListener("click",a=>{a.stopPropagation()}),document.addEventListener("keydown",a=>{a.key==="Escape"&&t.classList.contains("is-open")&&s()}));const c=window.location.pathname;document.querySelectorAll(".nav-link, .mobile-nav-link").forEach(r=>{r.classList.remove("active")}),c.includes("catalog.html")?document.querySelectorAll('[data-page="catalog"]').forEach(r=>{r.classList.add("active")}):c.includes("mylibrary.html")?document.querySelectorAll('[data-page="library"]').forEach(r=>{r.classList.add("active")}):document.querySelectorAll('[data-page="home"]').forEach(r=>{r.classList.add("active")})});const d=document.querySelector("#heroImg"),T=document.querySelector(".hero-h1"),q=document.querySelector(".hero-summary"),y=document.querySelector(".hero-button-watchTrailer");function A(e){return e.length>170?e.slice(0,170)+"...":e}function p(e){const t=window.matchMedia("(max-width: 767px)"),o=window.matchMedia("(min-width: 768px) and (max-width: 1279px)"),n=window.matchMedia("(min-width: 1280px)"),s=`${h}${l.IMG_W500}${e.backdrop_path}`,c=`${h}${l.IMG_W780}${e.backdrop_path}`,i=`${h}${l.IMG_W1280}${e.backdrop_path}`;t.matches?(d.style.backgroundImage=`url(${s})`,d.style.height="380px"):o.matches?(d.style.backgroundImage=`url(${c})`,d.style.height="432px"):n.matches&&(d.style.backgroundImage=`url(${i})`,d.style.height="720px"),d.setAttribute("aria-label",e.title),T.innerHTML=e.title,q.innerHTML=A(e.overview)}m(u,l.POPULAR_MOVIES,{page:1}).then(e=>{console.log(e);const t=Math.floor(Math.random()*20),o=e.results[t],n=o.id;p(o),m(u,l.MOVIE_VIDEOS(n),{page:1}).then(s=>{const c=s.results.find(i=>i.official===!0&&i.site==="YouTube"&&i.type==="Trailer");if(c){const i=`https://www.youtube.com/watch?v=${c.key}`;y.href=i,y.addEventListener("click",()=>{window.open(i,"_blank")})}else console.log("No official YouTube trailer found.")})});window.addEventListener("resize",()=>{m(u,l.POPULAR_MOVIES,{page:1}).then(e=>{const t=Math.floor(Math.random()*20),o=e.results[t];p(o)})});const g=document.querySelector("#content-poster"),D=document.querySelector("#movie-title"),O=document.querySelector("#date-of-release"),N=document.querySelector("#avarage-vote"),B=document.querySelector("#popularity"),H=document.querySelector("#count-vote"),x=document.querySelector("#genres");let f={};const P=document.querySelector("#summary");m(u,l.GENRE_LIST).then(e=>{e.genres.forEach(t=>{f[t.id]=t.name})});m(u,l.UPCOMING_MOVIES,{page:1}).then(e=>{const t=new Date,o=e.results.filter(n=>new Date(n.release_date)>=t);if(o.length>0){const n=o[Math.floor(Math.random()*o.length)],s=`${h}${l.IMG_W1280}${n.backdrop_path}`;g.src=s,g.alt=n.title,g.title=n.overview,D.innerHTML=`${n.title}`;const c=new Date(n.release_date),i=c.getDate().toString().padStart(2,"0"),r=(c.getMonth()+1).toString().padStart(2,"0"),a=c.getFullYear();O.innerHTML=`${i}.${r}.${a}`,N.innerHTML=`${n.vote_average}`,B.innerHTML=`${n.popularity}`,H.innerHTML=`${n.vote_count}`;const L=n.genre_ids.map(b=>f[b]).join(", ");x.innerHTML=L,P.innerHTML=`${n.overview}`}});
//# sourceMappingURL=main-BP9mEUHw.js.map