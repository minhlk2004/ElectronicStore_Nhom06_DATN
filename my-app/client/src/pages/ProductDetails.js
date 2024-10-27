import React from 'react';
import ProductDetails from '../components/ProductDetails';
import ProductDescription from '../components/ProductDescription';

function ProductDetailPage() {
  return (
    <div className="product-detail-page">
      {/* Thông tin chi tiết sản phẩm */}
      <ProductDetails />

      {/* Mô tả sản phẩm */}
      <ProductDescription />

    </div>
  );
}

export default ProductDetailPage;