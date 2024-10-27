import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './Product.css';

const ProductItem = ({ img, title, priceSale, priceOriginal, discount, id }) => {
  const { handleAddToCart } = useCart();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  const handleAddToCartClick = (e) => {
    e.stopPropagation(); // Ngăn chặn sự kiện click trên div cha
    console.log("id sản phẩm:", id); // Hiển thị id sản phẩm trong console
    console.log("Hình ảnh sản phẩm:", img); // Hiển thị hình ảnh sản phẩm trong console
    handleAddToCart({ id, img, name: title, price: priceSale }); // Gọi hàm addToCart từ context
    navigate('/cart'); // Chuyển hướng đến giỏ hàng
  };

  return (
    <div className="homepage-product-item" onClick={handleClick}>
      <img src={`${process.env.PUBLIC_URL}${img}`} alt={title} className="homepage-product-img" />
      <h3 className="homepage-product-title">{title}</h3>
      <p className="homepage-price-sale">Giá: {priceSale}.000<sub>đ</sub></p>
      <p className="homepage-price-original">
        <del>{priceOriginal}.000<sub>đ</sub></del>
      </p>
      <p className="homepage-discount">Giảm: {discount}%</p>
      <button className="homepage-add-to-cart-sp" onClick={handleAddToCartClick}>Thêm vào giỏ hàng</button>
    </div>
  );
};

export default ProductItem;
