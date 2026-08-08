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

/* ---------- Newsletter Subscribe ---------- */
const subscribeForm = document.getElementById("subscribe-form");
const subscribeEmailInput = document.getElementById("subscribe-email");
const subscribeMessage = document.getElementById("subscribe-message");
const subscribeKey = "firstPaycheckSubscriberEmail";

function showSubscribeState(email) {
  if (!subscribeForm || !subscribeMessage) {
    return;
  }

  if (email) {
    subscribeForm.hidden = true;
    subscribeMessage.textContent = `You're subscribed as ${email}. Thanks for being here!`;
    subscribeMessage.classList.remove("error");
    subscribeMessage.classList.add("success");
  } else {
    subscribeForm.hidden = false;
    subscribeMessage.textContent = "";
    subscribeMessage.classList.remove("success", "error");
  }
}

function handleSubscribe(event) {
  event.preventDefault();
  const email = subscribeEmailInput.value.trim();

  if (!subscribeEmailInput.checkValidity() || !email) {
    subscribeMessage.textContent = "Please enter a valid email address.";
    subscribeMessage.classList.remove("success");
    subscribeMessage.classList.add("error");
    return;
  }

  localStorage.setItem(subscribeKey, email);
  showSubscribeState(email);
}

if (subscribeForm) {
  subscribeForm.addEventListener("submit", handleSubscribe);
  showSubscribeState(localStorage.getItem(subscribeKey));
}
