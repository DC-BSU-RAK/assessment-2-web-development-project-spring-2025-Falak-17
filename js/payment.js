function redirectToCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLatitude = position.coords.latitude;
        const userLongitude = position.coords.longitude;
        const googleMapsLink = `https://www.google.com/maps?q=${userLatitude},${userLongitude}`;
        window.location.href = googleMapsLink;
      },
      (error) => {
        alert("Unable to retrieve your location. Please allow location access.");
        console.error(error);
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

window.onload = function () {
  const savedCart = JSON.parse(localStorage.getItem('cart'));

  if (!savedCart || Object.keys(savedCart).length === 0) {
    document.getElementById('cartItemsContainer').innerText = 'Your cart is empty.';
    document.getElementById('cartTotal').innerText = '0.00';
    return;
  }

  let overallTotal = 0;
  const cartItemsList = [];

  const cartContainer = document.getElementById('cartItemsContainer');
  cartContainer.innerHTML = '';

  for (const itemName in savedCart) {
    const { qty: quantity, cost: unitPrice } = savedCart[itemName];
    const itemTotalPrice = quantity * unitPrice;
    overallTotal += itemTotalPrice;

    const cartItemElement = document.createElement('div');
    cartItemElement.classList.add('cart-item');
    cartItemElement.innerText = `${quantity} x ${itemName} @ $${unitPrice.toFixed(2)} each`;
    cartContainer.appendChild(cartItemElement);

    cartItemsList.push({ name: itemName, qty: quantity, price: unitPrice });
  }

  document.getElementById('cartTotal').innerText = overallTotal.toFixed(2);

  const cartSummary = { items: cartItemsList, total: overallTotal };
  localStorage.setItem('cartData', JSON.stringify(cartSummary));
};

function selectPaymentMethod(method) {
  document.querySelectorAll('.payment-method').forEach(button =>
    button.classList.remove('active')
  );

  const chosenButton = document.getElementById(method);
  if (chosenButton) chosenButton.classList.add('active');

  const methodInputField = document.getElementById('selectedMethod');
  if (methodInputField) methodInputField.value = method;

  document.getElementById('creditCardDetails').style.display = (method === 'CreditCard') ? 'block' : 'none';
  document.getElementById('cashDetails').style.display = (method === 'Cash') ? 'block' : 'none';
  document.getElementById('paypalDetails').style.display = (method === 'Paypal') ? 'block' : 'none';
}

function processPayment() {
  const storedCartData = JSON.parse(localStorage.getItem('cartData'));
  const finalTotal = storedCartData ? storedCartData.total.toFixed(2) : '0.00';
  const itemDescriptions = storedCartData?.items?.map(item =>
    `${item.qty} x ${item.name} @ $${item.price.toFixed(2)}`
  ).join('\n') || 'No items';

  const customerName = document.getElementById('fullName')?.value.trim();
  const customerPhone = document.getElementById('phone')?.value.trim();
  const customerAddress = document.getElementById('address')?.value.trim();
  const additionalNotes = document.getElementById('notes')?.value.trim();
  const selectedPaymentMethod = document.getElementById('selectedMethod')?.value;

  if (!customerName || !customerPhone || !customerAddress) {
    alert("Please fill in your name, phone, and address.");
    return;
  }

  let paymentDetails = '';
  if (selectedPaymentMethod === 'CreditCard') {
    const cardNumber = document.getElementById('cardNumber')?.value.trim();
    const expiryDate = document.getElementById('cardExpiry')?.value.trim();
    const cardHolderName = document.getElementById('cardHolder')?.value.trim();
    const securityCode = document.getElementById('cardCVV')?.value.trim();

    if (!cardNumber || !expiryDate || !cardHolderName || !securityCode) {
      alert("Please complete all credit card details.");
      return;
    }

    paymentDetails = `
Card Holder: ${cardHolderName}
Card #: ${cardNumber}
Expiry: ${expiryDate}
CVV: ${securityCode}`;
  }

  const receiptText = `
--- Receipt ---
Name: ${customerName}
Phone: ${customerPhone}
Address: ${customerAddress}

Items:
${itemDescriptions}

Total: $${finalTotal}
Payment Method: ${selectedPaymentMethod}
Notes: ${additionalNotes || 'N/A'}
${paymentDetails}

Thank you for your purchase!
`;

  const receiptBlob = new Blob([receiptText], { type: "text/plain" });
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(receiptBlob);
  downloadLink.download = "receipt.txt";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}