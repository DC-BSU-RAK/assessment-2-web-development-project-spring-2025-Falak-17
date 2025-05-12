// script.js

document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".list-group-item");
  const cards = document.querySelectorAll(".card");
  const priceInput = document.getElementById("priceInput");
  const filterBtn = document.getElementById("filterBtn");

  // Category filter
  menuItems.forEach(item => {
    item.addEventListener("click", () => {
      const category = item.textContent.trim().toLowerCase();

      cards.forEach(card => {
        const cardCategory = card.getAttribute("data-category").toLowerCase();
        card.style.display = category === "all menu" || cardCategory === category ? "block" : "none";
      });
    });
  });

  // Price filter
  if (filterBtn && priceInput) {
    filterBtn.addEventListener("click", () => {
      const maxPrice = parseFloat(priceInput.value);

      cards.forEach(card => {
        const priceText = card.querySelector(".price").textContent.replace("$", "");
        const price = parseFloat(priceText);

        card.style.display = price <= maxPrice ? "block" : "none";
      });
    });
  }

  // Favorite / Add to Cart Clicks
  document.querySelectorAll(".fa-heart").forEach(icon => {
    icon.addEventListener("click", () => {
      icon.classList.toggle("text-danger");
      alert("Added to favorites!");
    });
  });

  document.querySelectorAll(".fa-shopping-cart").forEach(icon => {
    icon.addEventListener("click", () => {
      alert("Item added to cart!");
    });
  });
});

let cart [];
        function addToCart(itemName, itemPrice) {
            cart.push({ name: itemName, price: itemPrice });
            updateCart();
        }
        function updateCart() {
            const cartItems = document.getElementById('cart-items');
            cartItems.innerHTML = '';
            cart.forEach((item, index) => {
                cartItems.innerHTML += `<div class='cart-item'>${item.name} - $${item.price.toFixed(2)} <button onclick='removeFromCart(${index})'>Remove</button></div>`;
            });
        }
        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCart();
        }
        function toggleCart() {
            const cart = document.getElementById('cart');
            cart.style.display = cart.style.display === 'block' ? 'none' : 'block';
        }