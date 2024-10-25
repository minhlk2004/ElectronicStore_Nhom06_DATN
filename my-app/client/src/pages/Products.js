// Products.js
import React from 'react';
import Category from '../components/Category'; // Đảm bảo đường dẫn chính xác
import ProductList from '../components/ProductList'; // Thay đổi từ ProductItem sang ProductList

const Products = () => {
  return (
    <div className="container-sanpham">
      <Category />
      <ProductList />
    </div>
  );
};

export default Products;