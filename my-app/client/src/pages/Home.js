import React, { useEffect, useState } from 'react';
import ProductItem from '../components/ProductItem'; // Đảm bảo đường dẫn là đúng
import './Home.css';
import Banner from '../components/Banner'; // Import component Banner

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products'); // Lấy tất cả sản phẩm
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="product-section">
      <Banner />
      <br/>
      <h2>SẢN PHẨM</h2>
      <div className="homepage-product-container">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductItem
              key={product.id}
              img={`${process.env.PUBLIC_URL}/img/${product.img}`}
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