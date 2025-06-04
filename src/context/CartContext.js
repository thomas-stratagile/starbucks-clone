import React, { createContext, useState, useContext } from 'react';

// Create the context
const CartContext = createContext();

// Custom hook to use the CartContext
export const useCart = () => {
  return useContext(CartContext);
};

// Create the provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (item) => {
    setCartItems(prevItems => {
      // Check if item already exists
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        // If exists, update quantity
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // If new, add to cart with quantity 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
    console.log('Added to cart:', item);
  };

  // TODO: Implement removeItemFromCart, updateItemQuantity, clearCart

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cartItems,
    addItemToCart,
    getCartTotal,
    getCartItemCount,
    // TODO: Add other functions here
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
