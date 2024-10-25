import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Products from './pages/Products';
import Category from './components/Category'; 
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './components/NotFound';
import ProductList from './components/ProductList';
import Cart from './pages/Cart'; // Import Giỏ hàng
import { CartProvider } from './components/CartContext'; // Import CartProvider

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {/* Hiển thị Header nếu không phải là trang login hoặc signup */}
      {(location.pathname !== '/login' && location.pathname !== '/signup') && <Header />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/category" element={<Category />} />
        <Route path="/products/:categoryId" element={<Products />} />
        <Route path="/products/category/:categoryId" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Hiển thị Footer nếu không phải là trang login, signup hoặc cart */}
      {(location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/cart') && <Footer />}
    </div>
  );
}

// Component bao bọc App trong Router
export default function RouterWrapper() {
  return (
    <Router>
      <CartProvider> {/* Bao bọc App bằng CartProvider để quản lý trạng thái giỏ hàng */}
        <App />
      </CartProvider>
    </Router>
  );
}