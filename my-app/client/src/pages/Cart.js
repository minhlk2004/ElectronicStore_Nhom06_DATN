import React from 'react';
import { useCart } from '../components/CartContext'; 
import './Cart.css';

const Cart = () => {
    const { cart, decreaseQuantity, increaseQuantity, removeFromCart } = useCart();

    // Kiểm tra xem cart có tồn tại và là mảng không
    if (!Array.isArray(cart)) {
        return <p>Giỏ hàng không tồn tại!</p>;
    }

    // Tính tổng
    const total = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

    return (
        <div className="cart-container">
            <h2>GIỎ HÀNG</h2>
            {cart.length === 0 ? (
                <p>Giỏ hàng của bạn hiện đang trống!</p>
            ) : (
                <table className="cart-table">
                    <thead>
                        <tr>
                            <th>Hình</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Tổng</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((product) => (
                            <tr key={product.id}>
                                <td><img src={product.img} alt={product.name} className="cart-product-img" /></td>
                                <td>{product.name}</td>
                                <td>{product.price.toLocaleString()} đ</td>
                                <td>
                                    <button className="quantity-btn" onClick={() => decreaseQuantity(product.id)} disabled={product.quantity === 1}>-</button>
                                    <span className="quantity">{product.quantity}</span>
                                    <button className="quantity-btn" onClick={() => increaseQuantity(product.id)}>+</button>
                                </td>
                                <td>{(product.price * product.quantity).toLocaleString()}.000đ</td>
                                <td>
                                    <button className="action-btn delete-btn" onClick={() => removeFromCart(product.id)}>Xoá</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>


                </table>
            )}
            <div className="cart-total">
                <h3>Tổng: {total.toLocaleString()}.000đ</h3>
                <hr />
                <button className="checkout-btn">Thanh Toán</button>
            </div>
        </div>
    );
};

export default Cart;