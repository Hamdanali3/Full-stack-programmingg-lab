// ========================================
// Lab Task 5: Product Catalog using Map
// Key = Product ID, Value = Product Object
// ========================================

const productCatalog = new Map();

const icons = { Electronics: "fa-laptop", Accessories: "fa-headphones", Peripherals: "fa-keyboard" };

productCatalog.set(101, { name: "Laptop", price: 85000, category: "Electronics" });
productCatalog.set(102, { name: "Headphones", price: 3500, category: "Accessories" });
productCatalog.set(103, { name: "Keyboard", price: 2500, category: "Peripherals" });
productCatalog.set(104, { name: "Mouse", price: 1500, category: "Peripherals" });
productCatalog.set(105, { name: "Monitor", price: 45000, category: "Electronics" });

const output = document.getElementById("output");
let html = "";

// All Products
html += `
    <div class="card">
        <h2><i class="fas fa-boxes-stacked"></i> All Products</h2>
        <p><span class="label">Total Products (.size):</span>
           <span class="badge"><i class="fas fa-hashtag"></i> ${productCatalog.size}</span></p>
`;

productCatalog.forEach(function (product, id) {
    html += `
        <div class="product-row">
            <div class="product-icon"><i class="fas ${icons[product.category] || 'fa-box'}"></i></div>
            <div>
                <p><span class="value">${product.name}</span>
                   <span class="category-tag">${product.category}</span></p>
                <p style="margin:2px 0"><span class="label">ID:</span> <span class="value">${id}</span></p>
            </div>
            <div class="product-price">Rs. ${product.price.toLocaleString()}</div>
        </div>
    `;
});
html += `</div>`;

// Search by ID
const searchId = 103;
const foundProduct = productCatalog.get(searchId);

html += `
    <div class="card">
        <h2><i class="fas fa-magnifying-glass"></i> Search by ID</h2>
        <p><span class="label">Searching for ID:</span> <span class="value">${searchId}</span></p>
        <div class="found-banner">
            <i class="fas fa-circle-check"></i>
            Found: <strong>${foundProduct.name}</strong> — Rs. ${foundProduct.price.toLocaleString()} (${foundProduct.category})
        </div>
    </div>
`;

// Delete product
const deleteId = 104;
const deletedProduct = productCatalog.get(deleteId);
productCatalog.delete(deleteId);

html += `
    <div class="card">
        <h2><i class="fas fa-trash-can"></i> Delete Product</h2>
        <p><span class="label">Deleted ID:</span> <span class="value">${deleteId} (${deletedProduct.name})</span></p>
        <div class="deleted-banner">
            <i class="fas fa-circle-xmark"></i> Product removed from catalog.
        </div>
        <p style="margin-top:12px"><span class="label">Remaining (.size):</span>
           <span class="badge"><i class="fas fa-hashtag"></i> ${productCatalog.size}</span></p>
    </div>
`;

// Updated Catalog
html += `
    <div class="card">
        <h2><i class="fas fa-rotate"></i> Updated Catalog</h2>
`;
productCatalog.forEach(function (product, id) {
    html += `
        <div class="product-row">
            <div class="product-icon"><i class="fas ${icons[product.category] || 'fa-box'}"></i></div>
            <div>
                <p><span class="value">${product.name}</span>
                   <span class="category-tag">${product.category}</span></p>
            </div>
            <div class="product-price">Rs. ${product.price.toLocaleString()}</div>
        </div>
    `;
});
html += `</div>`;

output.innerHTML = html;
