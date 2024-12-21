function showSelections() {
  const shakes = document.querySelectorAll('input[name="shake"]:checked');
  const table = document.getElementById("selectedShakesTable");
  let totalPrice = 0;

  table.innerHTML = "<tr><th>Shake</th><th>Price</th><th>Quantity</th></tr>";

  shakes.forEach(shake => {
    const shakeName = shake.value;
    const shakePrice = parseFloat(shake.getAttribute("data-price"));
   
    const row = table.insertRow();
    row.innerHTML = `<td>${shakeName}</td><td>₱${shakePrice.toFixed(2)}</td><td><input type="number" name="quantity" value="1" min="1" data-price="${shakePrice}" onchange="updateTotal()"></td>`;
    
    totalPrice += shakePrice;
  });
  document.getElementById("step1").style.display = "none";
  document.getElementById("step2").style.display = "block";
}

function updateTotal() {
  let totalPrice = 0;
  const quantities = document.querySelectorAll('input[name="quantity"]');
  
  quantities.forEach(quantity => {
    const price = parseFloat(quantity.getAttribute("data-price"));
    const qty = parseInt(quantity.value);
    totalPrice += price * qty;
  });

  document.getElementById("totalPrice").innerText = totalPrice.toFixed(2);
}

function placeOrder() {
  const table = document.getElementById("summaryTable");
  table.innerHTML = "<tr><th>Shake</th><th>Quantity</th><th>Price</th></tr>";

  const quantities = document.querySelectorAll('input[name="quantity"]');
  let totalPrice = 0;

  quantities.forEach(quantity => {
    const shakeName = quantity.closest('tr').children[0].innerText;
    const price = parseFloat(quantity.getAttribute("data-price"));
    const qty = parseInt(quantity.value);

    // Add to order summary table
    const row = table.insertRow();
    row.innerHTML = `<td>${shakeName}</td><td>${qty}</td><td>₱${(price * qty).toFixed(2)}</td>`;

    totalPrice += price * qty;
  });

  // Hide Step 2 and show Order Summary
  document.getElementById("step2").style.display = "none";
  document.getElementById("orderSummary").style.display = "block";
  document.getElementById("totalPrice").innerText = totalPrice.toFixed(2);
}

function finalOrder() {
  alert("Your order has been placed! Thank you for choosing Frost Shake!");
  // Here you could send the order to the server for processing, or show a confirmation page.
}

function goBackToStep1() {
  // Hide Step 2 and show Step 1
  document.getElementById("step2").style.display = "none";
  document.getElementById("step1").style.display = "block";
}