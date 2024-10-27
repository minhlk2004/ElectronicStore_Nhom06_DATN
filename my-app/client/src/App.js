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
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { CartProvider } from './components/CartContext';
import ProductDetails from './pages/ProductDetails'; // Import trang chi tiết sản phẩm

function App() {
  const location = useLocation();
  
  // Kiểm tra xem có nên hiển thị Header và Footer hay không
  const shouldDisplayHeader = !['/login', '/signup', '/checkout'].includes(location.pathname);
  const shouldDisplayFooter = !['/login', '/signup', '/cart', '/checkout'].includes(location.pathname);

  return (
    <div className="App">
      {shouldDisplayHeader && <Header />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/category" element={<Category />} />
        <Route path="/products/:categoryId" element={<Products />} />
        <Route path="/products/category/:categoryId" element={<ProductList />} />
        <Route path="/product/:productId" element={<ProductDetails />} /> {/* Đường dẫn cho ProductDetails */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {shouldDisplayFooter && <Footer />}
    </div>
  );
}

// Component bao bọc App trong Router
export default function RouterWrapper() {
  return (
    <Router>
      <CartProvider>
        <App />
      </CartProvider>
    </Router>
  );
}