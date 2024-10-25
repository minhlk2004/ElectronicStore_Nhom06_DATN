import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './Product.css';

const ProductItem = ({ img, title, priceSale, priceOriginal, discount, id }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Ngăn chặn sự kiện click trên div cha
    addToCart({ id, img, name: title, price: priceSale }); // Đảm bảo id có giá trị hợp lệ
    navigate(`/cart?Id=${id}`); // Chuyển hướng đến giỏ hàng với ID sản phẩm
  };


  return (
    <div className="homepage-product-item" onClick={handleClick}>
      <img src={img} alt={title} className="homepage-product-img" />
      <h3 className="homepage-product-title">{title}</h3>
      <p className="homepage-price-sale">Giá: {priceSale}.000<sub>đ</sub></p>
      <p className="homepage-price-original">
        <del>{priceOriginal}.000<sub>đ</sub></del>
      </p>
      <p className="homepage-discount">Giảm: {discount}%</p>
      <button className="homepage-add-to-cart-sp" onClick={handleAddToCart}>
        Thêm vào giỏ hàng
      </button>
    </div>
  );
};

export default ProductItem;
