import React from 'react';
import ProductCard from './ProductCard';
import '../css/ProductOverview.css';

function ProductOverview({ products, addToCart }) {
    return (
        <div className="product-overview">
            <div className="product-overview-header">
                <h2>Product Overview</h2>
            </div>

            <div className="products-grid">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={() => addToCart(product)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ProductOverview;