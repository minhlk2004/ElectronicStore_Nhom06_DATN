import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Product.css'; // Đảm bảo rằng file CSS tồn tại

const Category = () => {
  const [categories, setCategories] = React.useState([]);
  const navigate = useNavigate(); // Khởi tạo hook navigate

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/categories'); // Đường dẫn đến API
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    // Điều hướng đến trang sản phẩm với id danh mục
    navigate(`/products/${categoryId}`);
  };

  return (
    <aside className="sidebar">
      <h2>Danh Mục</h2>
      <hr />
      <ul>
        {categories.map(category => (
            <li key={category.id} onClick={() => handleCategoryClick(category.id)}>
            <a href="#!">{category.name}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Category;
