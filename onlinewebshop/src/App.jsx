import React, { useState, useEffect } from 'react';
import './App.css';
import ProductOverview from './components/ProductOverview';
import Cart from './components/Cart';

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

    // Ändere den Dokument-Titel
    useEffect(() => {
        const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        if (count === 0) {
            document.title = "1800 Store";
        } else {
            document.title = `1800 Store (${count})`;
        }
    }, [cartItems]);

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

    // Funktionen zum Entfernen von Artikeln
    const handleRemoveOne = (productId) => {
        setCartItems(prevItems => {
            return prevItems
                .map(item =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0);
        });
    };

    const handleRemoveAll = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    // Funktion für Checkout
    const handleCheckout = () => {
        if (cartItems.length === 0) return;

        // Bestätigungsdialog
        const confirmCheckout = window.confirm(
            `Möchten Sie mit dem Checkout fortfahren?\n\nGesamtbetrag: $${cartTotal.toFixed(2)}\nAnzahl Artikel: ${cartItems.reduce((sum, item) => sum + item.quantity, 0)}`
        );

        if (confirmCheckout) {
            // Hier würde normalerweise eine API-Aufruf erfolgen
            setTimeout(() => {
                alert('Checkout erfolgreich! Vielen Dank für Ihren Einkauf.');
                // Warenkorb leeren nach erfolgreichem Checkout
                setCartItems([]);
            }, 1000);
        }
    };

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div className="app">
            {/* Header */}
            <header className="header">
                <div className="logo-area">
                    <div className="store-square">Logo</div>
                    <span className="store-title">Store</span>
                </div>

                <nav className="nav">
                    <a href="#products">Products</a>
                    <a href="#cart">
                        Cart <span className="cart-badge">{cartCount}</span>
                    </a>
                </nav>
            </header>

            <main>
                {/* Products Section */}
                <section id="products">
                    <ProductOverview
                        products={products}
                        addToCart={addToCart}
                    />
                </section>

                {/* Cart Section */}
                <section id="cart">
                    <Cart
                        cartItems={cartItems}
                        updateQuantity={handleRemoveOne}
                        removeFromCart={handleRemoveAll}
                        cartTotal={cartTotal}
                        onCheckout={handleCheckout}
                    />
                </section>
            </main>

        </div>
    );
}

export default App;