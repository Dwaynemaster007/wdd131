document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.querySelector("#menu");
    const navigationList = document.querySelector(".navigation");

    menuButton.addEventListener("click", () => {
        navigationList.classList.toggle("open");
        menuButton.classList.toggle("open");
    });

    const currentYearSpan = document.querySelector("#currentyear");
    const lastModifiedParagraph = document.querySelector("#lastModified");

    const currentYear = new Date().getFullYear();
    currentYearSpan.textContent = currentYear;

    lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;
});