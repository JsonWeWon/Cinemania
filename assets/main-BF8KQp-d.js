import{a as v}from"./vendor-N5iQpiFS.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector("#library-container");if(!t){console.error("Element with ID 'library-container' not found!");return}fetch("./partials/library-list.html").then(e=>{if(!e.ok)throw new Error(`Failed to load library-list.html: ${e.statusText}`);return e.text()}).then(e=>{t.innerHTML=e;const n=document.getElementById("default-content");document.getElementById("library-list");const a=JSON.parse(localStorage.getItem("myLibrary"))||[];a.length===0?n.style.display="block":(n.style.display="none",L(a));const o=document.getElementById("go-to-catalog");o&&o.addEventListener("click",()=>{window.location.href="catalog.html"})}).catch(e=>{console.error("Error loading library-list.html:",e)})});function L(t){const e=document.getElementById("library-list");if(!e){console.error("Element with ID 'library-list' not found!");return}e.innerHTML="",t.forEach(n=>{const a=document.createElement("div");a.className="movie-item",a.innerHTML=`
      <h3>${n.title}</h3>
      <p>${n.description||"Açıklama mevcut değil"}</p>
    `,e.appendChild(a)})}document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector(".mobile-menu-btn"),e=document.querySelector(".mobile-menu"),n=document.querySelector(".mobile-menu-icon use"),a=document.body;function o(){const r=e.classList.contains("is-open");e.classList.toggle("is-open"),t.setAttribute("aria-expanded",!r),n.setAttribute("href",r?"./img/icons.svg#icon-menu":"./img/icons.svg#icon-close"),a.style.overflow=r?"":"hidden"}t&&e&&(t.addEventListener("click",s=>{s.stopPropagation(),o()}),document.querySelectorAll(".mobile-nav-link").forEach(s=>{s.addEventListener("click",()=>{o()})}),document.addEventListener("click",s=>{e.classList.contains("is-open")&&!s.target.closest(".mobile-menu")&&!s.target.closest(".mobile-menu-btn")&&o()}),e.addEventListener("click",s=>{s.stopPropagation()}),document.addEventListener("keydown",s=>{s.key==="Escape"&&e.classList.contains("is-open")&&o()}));const i=window.location.pathname;document.querySelectorAll(".nav-link, .mobile-nav-link").forEach(r=>{r.classList.remove("active")}),i.includes("catalog.html")?document.querySelectorAll('[data-page="catalog"]').forEach(r=>{r.classList.add("active")}):i.includes("mylibrary.html")?document.querySelectorAll('[data-page="library"]').forEach(r=>{r.classList.add("active")}):document.querySelectorAll('[data-page="home"]').forEach(r=>{r.classList.add("active")})});const b="016a30ce49a7789188b6fa9bad9963a6",E="https://api.themoviedb.org/3",g=document.getElementById("paginationNumbers"),h=document.getElementById("prevButton"),f=document.getElementById("nextButton"),p=document.getElementById("movieGrid");let c=1,l=1,k=1;async function I(){await y(c),u(),h.addEventListener("click",()=>m(c-1)),f.addEventListener("click",()=>m(c+1))}async function M(){try{const t=await v.get(`${E}/search/movie`,{params:{api_key:b,page:k,query:"Love"}});return console.log("response.data",t.data),t.data}catch(t){throw console.error("Error fetching movies:",t),t}}async function y(t){try{const e=await M(t);console.log("load movie data",e),w(e.results),l=e.total_pages,console.log("totalPages",l),c=t,u()}catch(e){console.error("Failed to load movies:",e),S("Failed to load movies. Please try again.")}}function w(t){t.forEach(e=>{const n=B(e);console.log("movieCard",n),p.appendChild(n)})}function B(t){const e=document.createElement("div");return e.className="movie-card",e.innerHTML=`
    <img src="https://image.tmdb.org/t/p/w500${t.poster_path}" alt="${t.title}">
    <h3>${t.title}</h3>
    <p>Release Date: ${t.release_date}</p>
    <p>Rating: ${t.vote_average}/10</p>
  `,console.log("card",e),e}function u(){g.innerHTML="";const t=Math.max(1,c-2),e=Math.min(l,t+4);for(let n=t;n<=e;n++){const a=document.createElement("button");a.textContent=n,a.classList.add("pagination-button"),n===c&&a.classList.add("active"),a.addEventListener("click",()=>m(n)),g.appendChild(a)}h.disabled=c===1,f.disabled=c===l}async function m(t){t>=1&&t<=l&&await y(t)}function S(t){const e=document.createElement("div");e.className="error-message",e.textContent=t,p.appendChild(e)}I();u();document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("theme-switch"),e=document.body,n=localStorage.getItem("theme");n?(e.classList.add(n),t.checked=n==="light-theme"):(e.classList.add("dark-theme"),t.checked=!1),t.addEventListener("change",()=>{t.checked?(e.classList.remove("dark-theme"),e.classList.add("light-theme"),localStorage.setItem("theme","light-theme")):(e.classList.remove("light-theme"),e.classList.add("dark-theme"),localStorage.setItem("theme","dark-theme"))})});
//# sourceMappingURL=main-BF8KQp-d.js.map
