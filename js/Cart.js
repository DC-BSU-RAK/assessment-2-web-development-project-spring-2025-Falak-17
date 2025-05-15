// Combined Cart System Implementation

document.addEventListener("DOMContentLoaded", () => {
  const cartArea = document.getElementById("cartItems");
  const totalPrice = document.getElementById("totalPrice");
  const cartCount = document.getElementById("cart-count");
  const cartList = document.getElementById("cartList");
  let cart = JSON.parse(localStorage.getItem("cart")) || {};

  // Save cart to local storage
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Toggle Cart Visibility
  window.toggleCart = function () {
    cartList.style.display = cartList.style.display === "none" ? "block" : "none";
  };

  // Render cart items and total
  function renderCart() {
    cartArea.innerHTML = "";
    let cartTotal = 0;
    let itemCount = 0;

    for (const item in cart) {
      const { cost, qty } = cart[item];
      cartTotal += cost * qty;
      itemCount += qty;

      const itemBox = document.createElement("div");
      itemBox.className = "cart-item";
      itemBox.innerHTML = `
        <span class='cart-item-name'>${item}</span>
        <span>$${cost.toFixed(2)}</span>
        <div class='cart-item-quantity'>
          <button class='quantity-btn' onclick='updateCart("${item}", -1)'>-</button>
          <span>${qty}</span>
          <button class='quantity-btn' onclick='updateCart("${item}", 1)'>+</button>
        </div>
      `;
      cartArea.appendChild(itemBox);
    }

    totalPrice.textContent = `Total: $${cartTotal.toFixed(2)}`;
    cartCount.textContent = itemCount;

    saveCart();
  }

  // Add item to cart
  window.addToCart = function (item, cost) {
    if (cart[item]) {
      cart[item].qty++;
    } else {
      cart[item] = { cost, qty: 1 };
    }
    renderCart();
  };

  // Update item quantity in cart
  window.updateCart = function (item, change) {
    if (cart[item]) {
      cart[item].qty += change;
      if (cart[item].qty <= 0) delete cart[item];
      renderCart();
    }
  };

  // Initialize cart display
  renderCart();
});