/* ---------- Temple Data ---------- */
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

/* ---------- DOM References ---------- */
const gallery = document.getElementById("gallery");
const pageHeading = document.getElementById("gallery-heading");
const menuButton = document.getElementById("menu");
const navigation = document.querySelector(".navigation");
const navLinks = document.querySelectorAll(".navigation a");

/* ---------- Helper: Get Dedication Year ---------- */
function getYear(dedicatedString) {
    return parseInt(dedicatedString.split(",")[0].trim(), 10);
}

/* ---------- Render Temple Cards ---------- */
function renderTemples(templeList) {
    gallery.innerHTML = "";

    templeList.forEach(temple => {
        const card = document.createElement("article");
        card.classList.add("temple-card");

        const name = document.createElement("h3");
        name.textContent = temple.templeName;

        const location = document.createElement("p");
        location.innerHTML = `<span class="label">Location:</span> ${temple.location}`;

        const dedicated = document.createElement("p");
        dedicated.innerHTML = `<span class="label">Dedicated:</span> ${temple.dedicated}`;

        const size = document.createElement("p");
        size.innerHTML = `<span class="label">Size:</span> ${temple.area.toLocaleString()} sq ft`;

        const image = document.createElement("img");
        image.src = temple.imageUrl;
        image.alt = `${temple.templeName} Temple`;
        image.loading = "lazy";
        image.width = 400;
        image.height = 250;

        card.appendChild(name);
        card.appendChild(location);
        card.appendChild(dedicated);
        card.appendChild(size);
        card.appendChild(image);

        gallery.appendChild(card);
    });
}

/* ---------- Filter Functions ---------- */
function filterTemples(filter) {
    let filtered = [];

    switch (filter) {
        case "old":
            filtered = temples.filter(t => getYear(t.dedicated) < 1900);
            pageHeading.textContent = "Old Temples (Before 1900)";
            break;
        case "new":
            filtered = temples.filter(t => getYear(t.dedicated) > 2000);
            pageHeading.textContent = "New Temples (After 2000)";
            break;
        case "large":
            filtered = temples.filter(t => t.area > 90000);
            pageHeading.textContent = "Large Temples (> 90,000 sq ft)";
            break;
        case "small":
            filtered = temples.filter(t => t.area < 10000);
            pageHeading.textContent = "Small Temples (< 10,000 sq ft)";
            break;
        case "home":
        default:
            filtered = temples;
            pageHeading.textContent = "Home";
            break;
    }

    renderTemples(filtered);
}

/* ---------- Navigation Event Listeners ---------- */
navLinks.forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        // Update active class
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");

        // Apply filter
        const filter = link.dataset.filter;
        filterTemples(filter);

        // Close mobile menu if open
        navigation.classList.remove("open");
        menuButton.classList.remove("open");
    });
});

/* ---------- Hamburger Menu Toggle ---------- */
menuButton.addEventListener("click", () => {
    document.getElementById("primary-nav").classList.toggle("open");
});

/* ---------- Footer: Year & Last Modified ---------- */
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent =
    `Last Modified: ${document.lastModified}`;

/* ---------- Initial Render ---------- */
filterTemples("home");