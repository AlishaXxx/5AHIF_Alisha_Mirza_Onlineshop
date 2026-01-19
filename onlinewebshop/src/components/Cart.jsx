import React, { useState } from 'react';
import LineItem from './LineItem';
import '../css/Cart.css';

function Cart({ cartItems, updateQuantity, removeFromCart, cartTotal, onCheckout }) {
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const handleCheckout = async () => {
        if (cartItems.length === 0) return;

        setIsCheckingOut(true);

        try {
            // Warte 1 Sekunde um Ladeeffekt zu zeigen
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Rufe die Checkout-Funktion von App.jsx auf
            if (onCheckout) {
                onCheckout();
            }
        } finally {
            setIsCheckingOut(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="cart">
                <h2 className="cart-title">Your Shopping Cart</h2>
                <div className="empty-cart">
                    <div className="empty-cart-icon">🛒</div>
                    <div className="empty-cart-message">
                        Your cart is empty. Add some products to get started!
                    </div>
                    <button
                        className="continue-shopping-btn"
                        onClick={() => {
                            document.getElementById('products').scrollIntoView({
                                behavior: 'smooth'
                            });
                        }}
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="cart">
            <h2 className="cart-title">Your Shopping Cart</h2>

            <div className="cart-table">
                <div className="cart-header">
                    <div className="header-item">Product</div>
                    <div className="header-quantity">Quantity</div>
                    <div className="header-price">Price</div>
                    <div className="header-total">Total</div>
                </div>

                <div className="cart-items">
                    {cartItems.map(item => (
                        <LineItem
                            key={item.id}
                            item={item}
                            updateQuantity={updateQuantity}
                            removeFromCart={removeFromCart}
                        />
                    ))}
                </div>

                <div className="cart-footer">
                    <div className="total-section">
                        <span className="total-label">Total Amount:</span>
                        <span className="total-amount">${cartTotal.toFixed(2)}</span>
                    </div>
                    <button
                        className="checkout-btn"
                        onClick={handleCheckout}
                        disabled={isCheckingOut}
                    >
                        {isCheckingOut ? (
                            <>
                                <span className="spinner"></span> Processing...
                            </>
                        ) : (
                            `Proceed to Checkout (${cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)`
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;