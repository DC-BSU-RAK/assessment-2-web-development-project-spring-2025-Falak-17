document.addEventListener("DOMContentLoaded", () => {
  const cartArea = document.getElementById("cartItems");
  const totalPrice = document.getElementById("totalPrice");
  const cartCount = document.getElementById("cart-count");
  const cartList = document.getElementById("cartList");

  let cart = JSON.parse(localStorage.getItem("cart")) || {};

  const saveCart = () => 
    { localStorage.setItem("cart", JSON.stringify(cart)); };

  const Cart = () => 
  { cartArea.innerHTML = "";
    let total = 0;
    let count = 0;

    for (const item in cart) 
    { const { cost, qty } = cart[item];
      total += cost * qty;
      count += qty;
      const itemBox = document.createElement("div");
      itemBox.className = "cart-item";
      itemBox.innerHTML = `
        <span class="cart-item-name">${item}</span>
        <span>$${cost.toFixed(2)}</span>
        <div class="cart-item-quantity">
          <button class="quantity-btn" onclick='updateCart("${item}", -1)'>-</button>
          <span>${qty}</span>
          <button class="quantity-btn" onclick='updateCart("${item}", 1)'>+</button>
        </div>`;
      cartArea.appendChild(itemBox);
    }

    totalPrice.textContent = `Total: $${total.toFixed(2)}`;
    cartCount.textContent = count;
    saveCart();
  };

  window.addToCart = (item, cost) => {
    cart[item] = cart[item] ? { ...cart[item], qty: cart[item].qty + 1 } : { cost, qty: 1 };
    Cart();
  };

  window.updateCart = (item, change) => 
  { if (cart[item]) 
    { cart[item].qty += change;
      if (cart[item].qty <= 0) delete cart[item];
      Cart(); }
  };

  window.toggleCart = () => {
  if (cartList) { cartList.style.display = cartList.style.display === "none" ? "block" : "none"; } };

  window.checkout = () => 
  { // Convert `cart` into `cartData` format used by payment.html
    const items = [];
    let total = 0;

    for (const name in cart) 
    { const { cost, qty } = cart[name];
      items.push({ name, qty, price: cost });
      total += qty * cost; }

    const cartData = { items, total };
    localStorage.setItem("cartData", JSON.stringify(cartData));

    // Redirect to payment page
    window.location.href = "payment.html";
  };

  Cart();
});