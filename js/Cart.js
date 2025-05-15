// Full Cart System Implementation
function toggleCart() {
  const cartList = document.getElementById("cartList");
  if (cartList.style.display === "none" || cartList.style.display === "") {
    cartList.style.display = "block";
  } else {
    cartList.style.display = "none";
  }
} 

document.addEventListener("click", (event) => {
  const cartList = document.getElementById("cartList");
  const cartIcon = document.querySelector(".cart-icon");

  if (!cartList.contains(event.target) && !cartIcon.contains(event.target)) {
    cartList.style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const cart = {};
  const cartArea = document.getElementById("cartArea");
  let cartTotal = 0;

  function renderCart() {
    cartArea.innerHTML = "";
    cartTotal = 0;

    for (const item in cart) {
      const { cost, qty } = cart[item];
      cartTotal += cost * qty;

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

    const totalBox = document.createElement("div");
    totalBox.className = "cart-total";
    totalBox.textContent = `Total: $${cartTotal.toFixed(2)}`;
    cartArea.appendChild(totalBox);

    const proceedButton = document.createElement("button");
    proceedButton.textContent = "Proceed to Payment";
    proceedButton.onclick = function() {
      alert("Proceeding to payment...");
      // Implement payment logic here
    };
    cartArea.appendChild(proceedButton);
  }

  window.addToCart = function(item, cost) {
    if (cart[item]) {
      cart[item].qty++;
    } else {
      cart[item] = { cost, qty: 1 };
    }
    renderCart();
  };

  window.updateCart = function(item, change) {
    if (cart[item]) {
      cart[item].qty += change;
      if (cart[item].qty <= 0) delete cart[item];
      renderCart();
    }
  };
});