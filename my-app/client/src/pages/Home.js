import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ProductItem from '../components/ProductItem'; // Đảm bảo đường dẫn là đúng
import './Home.css';
import Banner from '../components/Banner'; // Import component Banner

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const navigate = useNavigate(); // Khởi tạo useNavigate

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products'); // Lấy tất cả sản phẩm
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Đặt trạng thái loading thành false
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`); // Điều hướng đến trang chi tiết sản phẩm
  };

  return (
    <section className="product-section">
      <Banner />
      <br />
      <h2>SẢN PHẨM</h2>
      <div className="homepage-product-container">
        {loading ? ( // Hiển thị thông báo đang tải
          <p>Đang tải sản phẩm...</p>
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductItem
              id={product.id}
              onClick={() => handleProductClick(product.id)} // Điều hướng khi nhấn vào sản phẩm
              img={`${process.env.PUBLIC_URL}${product.img}`}
              title={product.name}
              priceSale={product.price}
              priceOriginal={product.oldprice}
              discount={product.discount}
            />
          ))
        ) : (
          <p>Không có sản phẩm nào trong danh mục này.</p>
        )}
      </div>
    </section>
  );
};

export default Home;