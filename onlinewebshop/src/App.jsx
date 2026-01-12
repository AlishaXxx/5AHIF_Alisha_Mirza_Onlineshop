import React, { useState } from 'react';
import './App.css';

function App() {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Tumbler Glass', quantity: 3, price: 19.00, status: 'Premarket in stock' },
        { id: 2, name: 'Organized Wallet', quantity: 2, price: 36.00, status: 'Premarket in stock' }
    ]);

    const products = [
        { id: 1, name: 'City Police Station', price: 79.99, category: 'City', image: '🚓' },
        { id: 2, name: 'City Fire Truck', price: 69.99, category: 'City', image: '🚒' },
        { id: 3, name: 'City Passenger Train', price: 119.99, category: 'City', image: '🚆' },
        { id: 4, name: 'Space Shuttle', price: 89.99, category: 'Space', image: '🚀' },
        { id: 5, name: 'Pirate Ship', price: 99.99, category: 'Pirates', image: '🏴‍☠️' },
        { id: 6, name: 'Medieval Castle', price: 149.99, category: 'Medieval', image: '🏰' },
        { id: 7, name: 'Race Car', price: 49.99, category: 'Vehicles', image: '🏎️' },
        { id: 8, name: 'Airport', price: 199.99, category: 'City', image: '✈️' },
        { id: 9, name: 'Hospital', price: 129.99, category: 'City', image: '🏥' },
        { id: 10, name: 'School Bus', price: 39.99, category: 'City', image: '🚌' },
        { id: 11, name: 'Construction Crane', price: 59.99, category: 'Construction', image: '🏗️' }
    ];

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevItems, {
                    ...product,
                    quantity: 1,
                    status: 'In stock'
                }];
            }
        });
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(id);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const removeFromCart = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div className="app">
            <header className="header">
                <h1 className="store-title">1800 Store</h1>
                <div className="header-info">
                    <span className="product-count">Produkte {products.length}</span>
                    <div className="cart-summary">
                        🛒 Warenkorb ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                    </div>
                </div>
            </header>

            <div className="main-content">
                <div className="product-overview">
                    <div className="product-overview-header">
                        <h2>Product Overview</h2>
                    </div>

                    <div className="products-grid">
                        {products.map(product => (
                            <div key={product.id} className="product-card">
                                <div className="product-image">
                                    <span className="product-emoji">{product.image}</span>
                                </div>
                                <div className="product-info">
                                    <h3 className="product-name">{product.name}</h3>
                                    <p className="product-category">{product.category}</p>
                                    <div className="product-price">${product.price.toFixed(2)}</div>
                                    <button className="view-details-btn">View Details</button>
                                    <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="cart">
                    <h2 className="cart-title">Your Shopping Cart</h2>

                    <div className="cart-table">
                        <div className="cart-header">
                            <div className="header-item">Item</div>
                            <div className="header-quantity">Quantity</div>
                            <div className="header-price">Price</div>
                            <div className="header-total">Item Total</div>
                        </div>

                        <div className="cart-items">
                            {cartItems.map(item => {
                                const itemTotal = (item.price * item.quantity).toFixed(2);
                                return (
                                    <div key={item.id} className="line-item">
                                        <div className="item-column">
                                            <div className="item-name">{item.name}</div>
                                            <div className="item-status">{item.status}</div>
                                        </div>

                                        <div className="quantity-column">
                                            <div className="quantity-controls">
                                                <button
                                                    className="quantity-btn"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                >
                                                    -
                                                </button>
                                                <span className="quantity-value">{item.quantity}</span>
                                                <button
                                                    className="quantity-btn"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                className="remove-btn"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                Remove
                                            </button>
                                        </div>

                                        <div className="price-column">
                                            ${item.price.toFixed(2)}
                                        </div>

                                        <div className="total-column">
                                            ${itemTotal}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="cart-footer">
                            <div className="total-section">
                                <span className="total-label">Total:</span>
                                <span className="total-amount">${cartTotal.toFixed(2)}</span>
                            </div>
                            <button className="checkout-btn">Proceed to Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;