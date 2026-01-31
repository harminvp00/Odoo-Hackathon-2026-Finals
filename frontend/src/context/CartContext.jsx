import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Load from local storage on init
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, rentalConfig) => {
        setCartItems(prev => {
            // Check if item already exists (simplified check)
            const existing = prev.find(item => item.product_id === product.product_id);
            if (existing) {
                // Update quantity
                return prev.map(item =>
                    item.product_id === product.product_id
                        ? { ...item, ...rentalConfig, quantity: item.quantity + rentalConfig.quantity }
                        : item
                );
            }
            return [...prev, { ...product, ...rentalConfig }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => item.product_id !== productId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
