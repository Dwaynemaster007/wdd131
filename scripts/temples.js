document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector("#menu");
    const navigationList = document.querySelector(".navigation");

    menuButton.addEventListener("click", () => {
        navigationList.classList.toggle("open");
        menuButton.classList.toggle("open");
    });

    const currentYearSpan = document.querySelector("#currentyear");
    const lastModifiedParagraph = document.querySelector("#lastModified");

    currentYearSpan.textContent = new Date().getFullYear();
    lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;
});