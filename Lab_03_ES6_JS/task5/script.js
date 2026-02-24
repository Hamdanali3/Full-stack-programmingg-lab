/* ============================================================
   Task 5 — Product Catalog
   ES6 Map, key-value pairs, search, delete, .size
   ============================================================ */

const catalog = new Map();
const tbodyEl = document.getElementById('tbody');
const statsEl = document.getElementById('stats');
const resultEl = document.getElementById('result');
const searchInputEl = document.getElementById('searchInput');

// Populate catalog — keys are product IDs
catalog.set('PRD-101', { name: 'Wireless Headphones', category: 'Audio', price: 3500, addedBy: 'Hamdan Ali' });
catalog.set('PRD-102', { name: 'Portable SSD 1TB', category: 'Storage', price: 8900, addedBy: 'Hamdan Ali' });
catalog.set('PRD-103', { name: 'Ergonomic Chair', category: 'Furniture', price: 22000, addedBy: 'Rabia Anwar' });
catalog.set('PRD-104', { name: 'USB Microphone', category: 'Audio', price: 4200, addedBy: 'Fahad Hussain' });
catalog.set('PRD-105', { name: '27" Monitor', category: 'Display', price: 35000, addedBy: 'Sana Yousuf' });
catalog.set('PRD-106', { name: 'Webcam HD 1080p', category: 'Peripherals', price: 2800, addedBy: 'Tariq Mehmood' });

renderTable();
renderStats();

function renderTable() {
    let html = '';
    for (const [id, prod] of catalog) {
        html += `<tr>
            <td><strong>${id}</strong></td>
            <td>${prod.name}</td>
            <td>${prod.category}</td>
            <td>Rs. ${prod.price.toLocaleString()}</td>
            <td><button class="del-btn" onclick="deleteProduct('${id}')">Remove</button></td>
        </tr>`;
    }
    tbodyEl.innerHTML = html;
}

function renderStats() {
    const total = [...catalog.values()].reduce((s, p) => s + p.price, 0);
    const categories = new Set([...catalog.values()].map(p => p.category));
    statsEl.innerHTML = `
        <div class="stat-box"><div class="num">${catalog.size}</div><div class="lbl">Total Products</div></div>
        <div class="stat-box"><div class="num">${categories.size}</div><div class="lbl">Categories</div></div>
        <div class="stat-box"><div class="num">Rs. ${total.toLocaleString()}</div><div class="lbl">Total Value</div></div>
    `;
}

function searchProduct() {
    const id = searchInputEl.value.trim().toUpperCase();
    if (!id) return;

    if (catalog.has(id)) {
        const p = catalog.get(id);
        resultEl.style.display = 'block';
        resultEl.innerHTML = `<strong>Found:</strong> ${p.name} — ${p.category} — Rs. ${p.price.toLocaleString()} (Added by ${p.addedBy})`;
    } else {
        resultEl.style.display = 'block';
        resultEl.innerHTML = `No product found with ID <strong>${id}</strong>.`;
        resultEl.style.background = '#fef2f2';
        resultEl.style.color = '#991b1b';
        setTimeout(() => { resultEl.style.background = ''; resultEl.style.color = ''; }, 2500);
    }
}

function deleteProduct(id) {
    catalog.delete(id);
    renderTable();
    renderStats();
    resultEl.style.display = 'block';
    resultEl.innerHTML = `Product <strong>${id}</strong> removed. Catalog size: ${catalog.size}`;
    console.log(`Deleted ${id}. Map size: ${catalog.size}`);
}

searchInputEl.addEventListener('keydown', e => {
    if (e.key === 'Enter') searchProduct();
});

console.log('--- Product Catalog Ready ---');
console.log('Map size:', catalog.size);
