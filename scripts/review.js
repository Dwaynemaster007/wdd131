/* ---------- Read Submitted Values ---------- */
const params = new URLSearchParams(window.location.search);

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = value;
  }
}

/* Product: map the submitted id back to its readable name */
const submittedProductId = params.get("product");
const matchedProduct = products.find((product) => product.id === submittedProductId);
setText("productOut", matchedProduct ? matchedProduct.name : "Not provided");

/* Rating: render as filled/empty stars */
const submittedRating = Number(params.get("rating"));
if (submittedRating >= 1 && submittedRating <= 5) {
  const filled = "\u2605".repeat(submittedRating);
  const empty = "\u2606".repeat(5 - submittedRating);
  setText("ratingOut", `${filled}${empty} (${submittedRating} of 5)`);
} else {
  setText("ratingOut", "Not provided");
}

/* Date of installation */
setText("dateOut", params.get("installDate") || "Not provided");

/* Features: checkboxes share the "features" name, so use getAll */
const submittedFeatures = params.getAll("features");
setText(
  "featuresOut",
  submittedFeatures.length ? submittedFeatures.join(", ") : "None selected"
);

/* Written review (optional) */
setText("reviewOut", params.get("review") || "No written review provided.");

/* Name (optional) */
setText("nameOut", params.get("username") || "Anonymous");

/* ---------- localStorage Review Counter ---------- */
let reviewCount = Number(localStorage.getItem("reviewCount")) || 0;
reviewCount += 1;
localStorage.setItem("reviewCount", reviewCount);
setText("reviewCount", reviewCount);

/* ---------- Footer: Year & Last Modified ---------- */
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent =
  `Last Modified: ${document.lastModified}`;
