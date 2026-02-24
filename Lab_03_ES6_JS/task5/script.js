// ========================================
// Lab Task 5: Product Catalog using Map
// Key = Product ID, Value = Product Object
// ========================================

// ---------- Create a Map ----------
const productCatalog = new Map();

// ---------- Add minimum 5 products ----------
productCatalog.set(101, { name: "Laptop", price: 85000, category: "Electronics" });
productCatalog.set(102, { name: "Headphones", price: 3500, category: "Accessories" });
productCatalog.set(103, { name: "Keyboard", price: 2500, category: "Peripherals" });
productCatalog.set(104, { name: "Mouse", price: 1500, category: "Peripherals" });
productCatalog.set(105, { name: "Monitor", price: 45000, category: "Electronics" });

// ---------- Display all products ----------
const output = document.getElementById("output");
let html = "";

// Card 1: All Products
html += `
    <div class="card">
        <h2>All Products (.size: ${productCatalog.size})</h2>
`;

productCatalog.forEach(function (product, id) {
    html += `
        <div class="product-row">
            <p><span class="label">ID:</span> ${id}</p>
            <p><span class="label">Name:</span> ${product.name}</p>
            <p><span class="label">Price:</span> Rs. ${product.price}</p>
            <p><span class="label">Category:</span> ${product.category}</p>
        </div>
    `;
});

html += `</div>`;

// ---------- Search by ID ----------
const searchId = 103;
const foundProduct = productCatalog.get(searchId);

html += `
    <div class="card">
        <h2>Search Product by ID</h2>
        <p><span class="label">Searching for ID:</span> ${searchId}</p>
        <p class="found">Found: ${foundProduct.name} — Rs. ${foundProduct.price} (${foundProduct.category})</p>
    </div>
`;

// ---------- Delete a product ----------
const deleteId = 104;
const deletedProduct = productCatalog.get(deleteId);
productCatalog.delete(deleteId);

html += `
    <div class="card">
        <h2>Delete Product</h2>
        <p><span class="label">Deleted ID:</span> ${deleteId} (${deletedProduct.name})</p>
        <p class="deleted">Product removed from catalog.</p>
        <p><span class="label">Total Products After Deletion (.size):</span> ${productCatalog.size}</p>
    </div>
`;

// Card 4: Updated Catalog after deletion
html += `
    <div class="card">
        <h2>Updated Catalog (After Deletion)</h2>
`;

productCatalog.forEach(function (product, id) {
    html += `
        <div class="product-row">
            <p><span class="label">ID:</span> ${id} — ${product.name} — Rs. ${product.price}</p>
        </div>
    `;
});

html += `</div>`;

output.innerHTML = html;
