import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductItem from './ProductItem';

// Đối tượng ánh xạ từ categoryId đến tên danh mục
const categories = {
  '1': 'Nồi Cơm Điện',
  '2': 'Tủ Lạnh',
  '3': 'Máy Giặt',
  '4': 'Máy Lọc Nước',
  // Bạn có thể thêm các danh mục khác tại đây
};

const ProductList = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Gán giá trị mặc định cho categoryId
  const defaultCategoryId = '1'; // Giá trị mặc định
  const currentCategoryId = categoryId || defaultCategoryId; // Nếu categoryId không có, sử dụng giá trị mặc định

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/category/${currentCategoryId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [currentCategoryId]); // Sử dụng currentCategoryId trong dependency array

  if (loading) return <p>Đang tải dữ liệu sản phẩm...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  // Lấy tên danh mục từ categories
  const categoryName = categories[currentCategoryId] || 'Danh mục không xác định';

  return (
    <section className="homepage-product-section">
      <h2>{categoryName}</h2> {/* Hiển thị tên danh mục */}
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

export default ProductList;
