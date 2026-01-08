import React from 'react';
import LineItem from './LineItem';
import './Cart.css';

function Cart({ cartItems, updateQuantity, removeFromCart, cartTotal }) {
    return (
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
                        <span className="total-label">Total:</span>
                        <span className="total-amount">${cartTotal.toFixed(2)}</span>
                    </div>
                    <button className="checkout-btn">Proceed to Checkout</button>
                </div>
            </div>
        </div>
    );
}

export default Cart;