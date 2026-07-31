/* ---------- Populate Product Select ---------- */
const productSelect = document.getElementById("product");

products.forEach((product) => {
  const option = document.createElement("option");
  option.value = product.id;
  option.textContent = product.name;
  productSelect.appendChild(option);
});

/* ---------- Footer: Year & Last Modified ---------- */
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent =
  `Last Modified: ${document.lastModified}`;
