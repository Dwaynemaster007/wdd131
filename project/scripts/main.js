/* ---------- Mobile Navigation Toggle ---------- */
const menuButton = document.getElementById("menu");
const primaryNav = document.getElementById("primary-nav");

function toggleNav() {
  const isOpen = primaryNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", `${isOpen}`);
}

menuButton.addEventListener("click", toggleNav);

/* ---------- Footer: Year & Last Modified ---------- */
const yearSpan = document.getElementById("currentyear");
const modifiedP = document.getElementById("lastModified");

if (yearSpan) {
  yearSpan.textContent = `${new Date().getFullYear()}`;
}

if (modifiedP) {
  modifiedP.textContent = `Last Modified: ${document.lastModified}`;
}
