// ---------------------------------------------------------
// Temple data
// ---------------------------------------------------------
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "images/aba-nigeria.webp",
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "images/manti-utah.webp",
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "images/payson-utah.webp",
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "images/yigo-guam.webp",
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "images/washington-dc.webp",
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "images/lima-peru.webp",
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "images/mexico-city-mexico.webp",
  },
  // --- Added temples (3+) ---
  {
    templeName: "St. George Utah",
    location: "St. George, Utah, United States",
    dedicated: "1877, April, 6",
    area: 107240,
    imageUrl: "images/st-george-utah.webp",
  },
  {
    templeName: "Freiberg Germany",
    location: "Freiberg, Germany",
    dedicated: "1985, June, 29",
    area: 8867,
    imageUrl: "images/freiberg-germany.webp",
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl: "images/rome-italy.webp",
  },
];

// ---------------------------------------------------------
// DOM references
// ---------------------------------------------------------
const gallery = document.getElementById("gallery");
const galleryHeading = document.getElementById("gallery-heading");
const navLinks = document.querySelectorAll(".navigation a");
const menuButton = document.getElementById("menu");
const primaryNav = document.getElementById("primary-nav");

// ---------------------------------------------------------
// Helpers
// ---------------------------------------------------------
function formatArea(area) {
  return area.toLocaleString("en-US");
}

function getDedicatedYear(temple) {
  return parseInt(temple.dedicated.split(",")[0].trim(), 10);
}

// ---------------------------------------------------------
// Rendering
// ---------------------------------------------------------
function createTempleCard(temple) {
  const card = document.createElement("article");
  card.className = "temple-card";

  const heading = document.createElement("h3");
  heading.className = "temple-name";
  heading.textContent = temple.templeName;

  const details = document.createElement("ul");
  details.className = "temple-details";
  details.innerHTML = `
    <li><span class="detail-label">Location</span> ${temple.location}</li>
    <li><span class="detail-label">Dedicated</span> ${temple.dedicated}</li>
    <li><span class="detail-label">Size</span> ${formatArea(temple.area)} sq ft</li>
  `;

  const img = document.createElement("img");
  img.src = temple.imageUrl;
  img.alt = `${temple.templeName} Temple`;
  img.loading = "lazy";
  img.decoding = "async";
  img.width = 400;
  img.height = 250;

  card.append(heading, details, img);
  return card;
}

function renderTemples(list) {
  gallery.innerHTML = "";
  const fragment = document.createDocumentFragment();
  list.forEach((temple) => fragment.appendChild(createTempleCard(temple)));
  gallery.appendChild(fragment);
}

// ---------------------------------------------------------
// Filtering
// ---------------------------------------------------------
const filters = {
  home: () => temples,
  old: () => temples.filter((t) => getDedicatedYear(t) < 1900),
  new: () => temples.filter((t) => getDedicatedYear(t) > 2000),
  large: () => temples.filter((t) => t.area > 90000),
  small: () => temples.filter((t) => t.area < 10000),
};

const filterLabels = {
  home: "Home",
  old: "Old",
  new: "New",
  large: "Large",
  small: "Small",
};

function applyFilter(filterName) {
  const filterFn = filters[filterName] || filters.home;
  renderTemples(filterFn());
  galleryHeading.textContent = filterLabels[filterName] || "Home";

  navLinks.forEach((link) => {
    const isActive = link.dataset.filter === filterName;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

// ---------------------------------------------------------
// Event listeners
// ---------------------------------------------------------
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    applyFilter(link.dataset.filter);
    closeMenu();
  });
});

function closeMenu() {
  primaryNav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}

menuButton.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

// ---------------------------------------------------------
// Footer: copyright year + last modified
// ---------------------------------------------------------
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent =
  "Last Modified: " + document.lastModified;

// ---------------------------------------------------------
// Initial render
// ---------------------------------------------------------
applyFilter("home");