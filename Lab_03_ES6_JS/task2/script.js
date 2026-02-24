// ========================================
// Lab Task 2: Online Shopping Cart
// Using Rest, Spread, and Destructuring
// ========================================

// ---------- Rest Operator (...items) ----------
// Collects multiple product arguments into an array
function addToCart(...items) {
    return items;
}

// Adding products using the rest operator
const cart = addToCart("Laptop", "Mouse", "Keyboard", "Monitor", "Headphones");

// ---------- Spread Operator ----------
// Clone the cart into a new array using spread
const clonedCart = [...cart];

// Add an extra item to the cloned cart (original stays unchanged)
const updatedCart = [...clonedCart, "USB Cable", "Webcam"];

// ---------- Array Destructuring ----------
// Extract the first product and remaining products
const [firstProduct, ...remainingProducts] = updatedCart;

// ---------- Display Results in HTML ----------
const container = document.getElementById("cart-output");

let html = "";

// Card 1: Original Cart
html += `
    <div class="card">
        <h2>Original Cart (Rest Operator)</h2>
        <p><span class="label">Total Items:</span> ${cart.length}</p>
        <p><span class="label">Products:</span></p>
        <p>${cart.map(item => `<span class="highlight">${item}</span>`).join(" ")}</p>
    </div>
`;

// Card 2: Cloned Cart
html += `
    <div class="card">
        <h2>Cloned Cart (Spread Operator)</h2>
        <p><span class="label">Total Items:</span> ${clonedCart.length}</p>
        <p><span class="label">Products:</span></p>
        <p>${clonedCart.map(item => `<span class="highlight">${item}</span>`).join(" ")}</p>
    </div>
`;

// Card 3: Updated Cart with extra items
html += `
    <div class="card">
        <h2>Updated Cart (Spread - Added More)</h2>
        <p><span class="label">Total Items:</span> ${updatedCart.length}</p>
        <p><span class="label">Products:</span></p>
        <p>${updatedCart.map(item => `<span class="highlight">${item}</span>`).join(" ")}</p>
    </div>
`;

// Card 4: Destructured Output
html += `
    <div class="card">
        <h2>Destructured Cart</h2>
        <p><span class="label">First Product:</span> ${firstProduct}</p>
        <p><span class="label">Remaining Products:</span></p>
        <p>${remainingProducts.map(item => `<span class="highlight">${item}</span>`).join(" ")}</p>
    </div>
`;

container.innerHTML = html;
