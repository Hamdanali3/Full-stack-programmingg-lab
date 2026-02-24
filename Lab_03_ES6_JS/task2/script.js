// ========================================
// Lab Task 2: Online Shopping Cart
// Using Rest, Spread, and Destructuring
// ========================================

// ---------- Rest Operator (...items) ----------
function addToCart(...items) {
    return items;
}

const cart = addToCart("Laptop", "Mouse", "Keyboard", "Monitor", "Headphones");

// ---------- Spread Operator ----------
const clonedCart = [...cart];
const updatedCart = [...clonedCart, "USB Cable", "Webcam"];

// ---------- Array Destructuring ----------
const [firstProduct, ...remainingProducts] = updatedCart;

// ---------- Display Results ----------
const container = document.getElementById("cart-output");

const buildTags = (arr) => arr.map(item =>
    `<span class="highlight"><i class="fas fa-box-open"></i> ${item}</span>`
).join("");

let html = `
    <div class="card">
        <h2><i class="fas fa-basket-shopping"></i> Original Cart (Rest Operator)</h2>
        <p><span class="label">Total Items:</span> <span class="value">${cart.length}</span></p>
        <div class="tag-container">${buildTags(cart)}</div>
    </div>

    <div class="card">
        <h2><i class="fas fa-clone"></i> Cloned Cart (Spread Operator)</h2>
        <p><span class="label">Total Items:</span> <span class="value">${clonedCart.length}</span></p>
        <div class="tag-container">${buildTags(clonedCart)}</div>
    </div>

    <div class="card">
        <h2><i class="fas fa-cart-plus"></i> Updated Cart (Spread &mdash; Added More)</h2>
        <p><span class="label">Total Items:</span> <span class="value">${updatedCart.length}</span></p>
        <div class="tag-container">${buildTags(updatedCart)}</div>
    </div>

    <div class="card">
        <h2><i class="fas fa-scissors"></i> Destructured Cart</h2>
        <p><span class="label">First Product:</span> <span class="value">${firstProduct}</span></p>
        <p><span class="label">Remaining Products:</span></p>
        <div class="tag-container">${buildTags(remainingProducts)}</div>
    </div>
`;

container.innerHTML = html;
