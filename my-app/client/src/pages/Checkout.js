import React, { useState } from 'react'; // Import useState
import { useCart } from '../components/CartContext'; 
import { useNavigate } from 'react-router-dom'; 
import './Checkout.css';

const Checkout = () => {
    const navigate = useNavigate(); 
    const { cart } = useCart(); 
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Giả sử bạn lưu trạng thái đăng nhập ở đây

    const [paymentMethod, setPaymentMethod] = useState(''); // Khởi tạo paymentMethod

    const total = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

    const handleContinueShopping = () => {
        navigate('/'); 
    };

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value); // Cập nhật phương thức thanh toán
    };

    const handlePlaceOrder = (event) => {
        event.preventDefault();

        // Kiểm tra phương thức thanh toán
        if (!paymentMethod) { 
            alert("Vui lòng chọn phương thức thanh toán!");
            return;
        }

        if (!isLoggedIn) {
            // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
            navigate('/login'); 
        } else {
            // Nếu đã đăng nhập, chuyển hướng đến trang hóa đơn thành công
            navigate('/order-success'); 
        }
    };

    return (
        <div className="container-1">
            <div className="product-details">
                <h2>SẢN PHẨM</h2>
                <table className="product-table">
                    <tbody>
                        {cart.length === 0 ? (
                            <tr>
                                <td colSpan="5">Giỏ hàng của bạn trống!</td>
                            </tr>
                        ) : (
                            cart.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                    <img src={`${process.env.PUBLIC_URL}${product.img}`} alt={product.name} />

                                    </td>
                                    <td className="product-info">
                                        <p>{product.name}</p>
                                    </td>
                                    <td>{product.price.toLocaleString()}.000đ</td>
                                    <td>
                                        <div className="quantity-control">
                                            <input type="text" value={product.quantity} readOnly />
                                        </div>
                                    </td>
                                    <td>{(product.price * product.quantity).toLocaleString()}.000đ</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                <button className="out" onClick={handleContinueShopping}>Tiếp tục thêm sản phẩm</button>
            </div>

            <div className="checkout-section">
                <div className="payment-info">
                    <h2>THÔNG TIN THANH TOÁN</h2>
                    <form className="checkout-form" onSubmit={handlePlaceOrder}>
                        <label htmlFor="name">Họ và tên:</label>
                        <input type="text" id="name" placeholder="Họ và tên..." required />

                        <label htmlFor="phone">Số điện thoại:</label>
                        <input type="tel" id="phone" placeholder="Số điện thoại..." required />

                        <label htmlFor="address">Địa chỉ nhận hàng:</label>
                        <input type="text" id="address" placeholder="Địa chỉ nhận hàng (Số nhà, đường)..." required />

                        <label htmlFor="city">Quận/xã:</label>
                        <input type="text" id="city" placeholder="Quận/xã" required />

                        <label htmlFor="district">Phường/huyện:</label>
                        <input type="text" id="district" placeholder="Phường/huyện" required />

                        <label htmlFor="ward">Tỉnh/Thành phố:</label>
                        <input type="text" id="ward" placeholder="Tỉnh/Thành phố" required />

                        <button type="submit" className="order-btn">Đặt hàng</button>
                    </form>
                </div>

                <div className="order-summary">
                    <h2>ĐƠN HÀNG CỦA BẠN</h2>
                    <div className="summary-item">
                        <p>Sản phẩm</p>
                        <p>Tổng</p>
                    </div>
                    {cart.map((product) => (
                        <div className="summary-item" key={product.id}>
                            <p>{product.name}</p>
                            <p>{(product.price * product.quantity).toLocaleString()}.000đ</p>
                        </div>
                    ))}
                    <div className="summary-item total">
                        <p>Tổng</p>
                        <p>{total.toLocaleString()}.000đ</p>
                    </div>

                    <h4>Phương thức thanh toán</h4>
                    <div className="payment-methods">
                        <input type="radio" id="bank" name="payment" value="bank" onChange={handlePaymentMethodChange} />
                        <label htmlFor="bank">Thanh toán Ngân hàng</label><br />
                        <input type="radio" id="e-wallet" name="payment" value="e-wallet" onChange={handlePaymentMethodChange} />
                        <label htmlFor="e-wallet">Thanh toán Ví điện tử</label><br />
                        <input type="radio" id="cod" name="payment" value="cod" onChange={handlePaymentMethodChange} />
                        <label htmlFor="cod">Thanh toán khi nhận hàng</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;