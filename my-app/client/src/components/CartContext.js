import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        // Nếu sản phẩm đã có trong giỏ, tăng quantity
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Nếu sản phẩm chưa có trong giỏ, thêm sản phẩm mới
        return [...prevCart, { ...product, quantity: 1 }];
      }
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
    <CartContext.Provider value={{ cart, addToCart, decreaseQuantity, increaseQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
