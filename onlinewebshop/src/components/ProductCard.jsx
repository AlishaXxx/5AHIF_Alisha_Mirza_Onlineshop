import React from 'react';
import './ProductCard.css';

function ProductCard({ product, onAddToCart }) {
    return (
        <div className="product-card">
            <div className="product-image">
                <span className="product-emoji">{product.image}</span>
            </div>
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <div className="product-price">${product.price.toFixed(2)}</div>
                <button className="view-details-btn">View Details</button>
                <button className="add-to-cart-btn" onClick={onAddToCart}>
                    Add to cart
                </button>
            </div>
        </div>
    );
}

export default ProductCard;