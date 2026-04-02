export default function ProductCard({ product }) {
  return (
    <div className="col-lg-3 col-md-6">
      <article className="product-card h-100">
        <div className="product-image position-relative">
          {product.badge && (
            <span className="badge bg-secondary position-absolute top-0 start-0 m-2">
              {product.badge}
            </span>
          )}
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info p-3">
          <p className="text-muted mb-1">{product.category}</p>
          <h5>{product.name}</h5>
          {product.rating && (
            <p className="mb-2 text-warning">
              <i className="fas fa-star" /> {product.rating} <small className="text-muted">({product.reviews || 0})</small>
            </p>
          )}
          <p className="text-secondary-custom fw-semibold mb-3">
            ${product.price.toLocaleString()}{' '}
            {product.oldPrice && (
              <small className="text-muted text-decoration-line-through">
                ${product.oldPrice.toLocaleString()}
              </small>
            )}
          </p>
          <button className="btn btn-primary-custom w-100" type="button">
            Add to Cart
          </button>
        </div>
      </article>
    </div>
  );
}
