document.addEventListener("DOMContentLoaded", () => {
// Select category buttons, cards, price input, and filter button
const categoryButtons = document.querySelectorAll(".list-group-item");
const menuCards = document.querySelectorAll(".card");

// Filter by category
categoryButtons.forEach(button => 
{ button.addEventListener("click", () => {
    const category = button.textContent.trim().toLowerCase();
    menuCards.forEach(card => 
    { const cardCategory = card.dataset.category.toLowerCase();
      card.style.display = (category === "all menu" || cardCategory === category) ? "block" : "none"; });
}); });

// Add to cart action
document.querySelectorAll(".fa-shopping-cart").forEach(icon => {
  icon.addEventListener("click", () => {
    alert("Item added to cart!");
  });  });
});