import React from 'react';
import './css/LineItem.css';

function LineItem({ item, updateQuantity, removeFromCart }) {
    const itemTotal = (item.price * item.quantity).toFixed(2);

    return (
        <div className="line-item">
            <div className="item-column">
                <div className="item-name">{item.name}</div>
                <div className="item-status">{item.status}</div>
            </div>

           //Quantity Column
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

          // PRice Column
            <div className="price-column">
                ${item.price.toFixed(2)}
            </div>

            // Total Column
            <div className="total-column">
                ${itemTotal}
            </div>
        </div>
    );
}

export default LineItem;