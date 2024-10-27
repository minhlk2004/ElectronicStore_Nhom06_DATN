import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';

function ProductDescription() {
  const { productId } = useParams(); // Lấy productId từ URL
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDescription = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${productId}`);
        if (!response.ok) {
          throw new Error('Không thể lấy thông tin sản phẩm');
        }
        const productData = await response.json();
        setDescription(productData.description); // Giả sử API trả về mô tả sản phẩm trong trường "description"
        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi lấy mô tả sản phẩm:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProductDescription();
  }, [productId]);

  if (loading) return <p>Đang tải mô tả sản phẩm...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  return (
    <div className="product-description">
      <h1>Mô tả sản phẩm</h1>
      <p>{description}</p>
    </div>
  );
}

export default ProductDescription;
