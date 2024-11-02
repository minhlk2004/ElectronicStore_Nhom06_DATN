// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import { UserProvider } from './components/UserContext';
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
import ProductDetails from './pages/ProductDetails';
import Invoice from './components/Invoice';

function App() {
  const location = useLocation();

  // Kiểm tra xem có nên hiển thị Header và Footer hay không
  const shouldDisplayHeader = !['/login', '/signup', '/checkout', '/invoice'].includes(location.pathname); // Sửa đường dẫn '/Invoice' thành '/invoice'
  const shouldDisplayFooter = !['/login', '/signup', '/cart', '/checkout', '/invoice'].includes(location.pathname); // Sửa đường dẫn '/Invoice' thành '/invoice'

  return (
    <div className="App">
      {shouldDisplayHeader && <Header />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/category" element={<Category />} />
        <Route path="/products/:categoryId" element={<Products />} />
        <Route path="/products/category/:categoryId" element={<ProductList />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/invoice" element={<Invoice />} />
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
      <UserProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </UserProvider>
    </Router>
  );
}