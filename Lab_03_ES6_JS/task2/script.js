/* ============================================================
   Task 2 — Online Shopping Cart
   Rest operator, Spread operator, Array Destructuring
   ============================================================ */

const app = document.getElementById('app');
let output = '';

// ── Rest operator: accept any number of items ──────────────
const cart = [];

function addToCart(...items) {
    cart.push(...items);
    return cart;
}

addToCart(
    { name: 'Mechanical Keyboard', price: 4500, buyer: 'Hamdan Ali' },
    { name: 'USB-C Hub', price: 2800, buyer: 'Hamdan Ali' }
);
addToCart(
    { name: 'Monitor Stand', price: 3200, buyer: 'Zainab Shah' },
    { name: 'Wireless Mouse', price: 1500, buyer: 'Ahmed Tariq' },
    { name: 'Laptop Sleeve', price: 900, buyer: 'Nadia Farooq' }
);

output += `<div class="panel">
    <h2>Cart Items (Rest Operator)</h2>
    <span class="label rest">...items</span>
    <div class="output-block">${cart.map((item, i) => `${i + 1}. ${item.name} — Rs. ${item.price.toLocaleString()} (${item.buyer})`).join('\n')}</div>
    <div class="total-bar">
        <span>Total Items: ${cart.length}</span>
        <span>Total: Rs. ${cart.reduce((s, i) => s + i.price, 0).toLocaleString()}</span>
    </div>
</div>`;

// ── Spread operator: clone and extend cart ─────────────────
const clonedCart = [...cart];
const extraItems = [
    { name: 'Desk Lamp', price: 1800, buyer: 'Hamdan Ali' },
    { name: 'Cable Organizer', price: 650, buyer: 'Imran Malik' }
];
const updatedCart = [...clonedCart, ...extraItems];

output += `<div class="panel">
    <h2>Updated Cart (Spread Operator)</h2>
    <span class="label spread">[...cart, ...extras]</span>
    <div class="output-block">${updatedCart.map((item, i) => `${i + 1}. ${item.name} — Rs. ${item.price.toLocaleString()}`).join('\n')}</div>
    <div class="total-bar">
        <span>Items: ${updatedCart.length}</span>
        <span>Updated Total: Rs. ${updatedCart.reduce((s, i) => s + i.price, 0).toLocaleString()}</span>
    </div>
</div>`;

// ── Array Destructuring ────────────────────────────────────
const [firstItem, secondItem, ...remaining] = updatedCart;

output += `<div class="panel">
    <h2>Destructured Cart</h2>
    <span class="label destr">[first, second, ...rest]</span>
    <div class="output-block">First Item:  ${firstItem.name} — Rs. ${firstItem.price.toLocaleString()}
Second Item: ${secondItem.name} — Rs. ${secondItem.price.toLocaleString()}
Remaining:   ${remaining.length} item(s)</div>
</div>`;

app.innerHTML = output;

// Console output
console.log('--- Shopping Cart ---');
console.log('Cart:', cart);
console.log('Updated Cart:', updatedCart);
console.log('Destructured → First:', firstItem.name, '| Second:', secondItem.name);
