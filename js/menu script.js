document.addEventListener("DOMContentLoaded", () => {
// Select category buttons, cards, price input, and filter button
const categoryButtons = document.querySelectorAll(".list-group-item");
const menuCards = document.querySelectorAll(".card");
const priceField = document.getElementById("priceInput");
const filterButton = document.getElementById("filterBtn");

// Filter by category
categoryButtons.forEach(button => 
{ button.addEventListener("click", () => {
    const category = button.textContent.trim().toLowerCase();
    menuCards.forEach(card => 
    { const cardCategory = card.dataset.category.toLowerCase();
      card.style.display = (category === "all menu" || cardCategory === category) ? "block" : "none"; });
}); });

// Filter by price
if (filterButton && priceField) {
  filterButton.addEventListener("click", () => {
    const maxPrice = parseFloat(priceField.value);
    menuCards.forEach(card => {
      const price = parseFloat(card.querySelector(".price").textContent.replace("$", ""));
      card.style.display = (price <= maxPrice) ? "block" : "none"; });
    });}

// Favorite item action
document.querySelectorAll(".fa-heart").forEach(icon => {
  icon.addEventListener("click", () => {
    icon.classList.toggle("text-danger");
    alert("Added to favorites!");
  }); });

// Add to cart action
document.querySelectorAll(".fa-shopping-cart").forEach(icon => {
  icon.addEventListener("click", () => {
    alert("Item added to cart!");
  });  });
});