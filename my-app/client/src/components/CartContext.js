import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // CartContext.js
  const handleAddToCart = (product) => {
    console.log("Product added to cart:", product); // Kiểm tra xem img có tồn tại không
    setCart((prevCart) => {
        const existingProduct = prevCart.find((item) => item.id === product.id);
        if (existingProduct) {
            return prevCart.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        }
        return [...prevCart, { ...product, quantity: 1 }];
    });
};

  
  
  const decreaseQuantity = (id) => {
    setCart(prevCart => {
      return prevCart.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) } // Đảm bảo không giảm xuống dưới 1
          : item
      );
    });
  };

  const increaseQuantity = (id) => {
    setCart(prevCart => {
      return prevCart.map(item => 
        item.id === id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, handleAddToCart, decreaseQuantity, increaseQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
