import React, { useState } from 'react'; // Import useState
import { useCart } from '../components/CartContext'; 
import { useNavigate } from 'react-router-dom'; 
import './Checkout.css';

const Checkout = () => {
    const navigate = useNavigate(); 
    const { cart } = useCart(); 

    const [paymentMethod, setPaymentMethod] = useState('');
    const total = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value); // Cập nhật phương thức thanh toán
    };

    const handlePlaceOrder = (event) => {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của form

        if (!paymentMethod) { // Kiểm tra phương thức thanh toán
            alert("Vui lòng chọn phương thức thanh toán!"); // Thông báo cho người dùng
            return;
        }

        // Tạo thông tin để truyền
        const customerInfo = {
            nameUser: event.target.nameUser.value,
            phoneUser: event.target.phoneUser.value,
            Diachi: event.target.Diachi.value,
        };

        // Chuyển hướng đến trang hóa đơn với toàn bộ thông tin cần thiết
        navigate('/invoice', {
            state: {
                customerInfo,
                totalAmount: total,
                paymentMethod,
                cartItems: cart, // Thêm giỏ hàng vào để gửi
            },
        });
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
                                        <img src={`${process.env.PUBLIC_URL}/img/${product.img}`} alt={product.name} />
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
                <button className="out" onClick={() => navigate('/products')}>Tiếp tục thêm sản phẩm</button>
            </div>

            <div className="checkout-section">
                <div className="payment-info">
                    <h2>THÔNG TIN THANH TOÁN</h2>
                    <form className="checkout-form" onSubmit={handlePlaceOrder}>
                        <label htmlFor="name">Họ và tên:</label>
                        <input type="text" name='nameUser' id="nameUser" placeholder="Họ và tên..." required />

                        <label htmlFor="phone">Số điện thoại:</label>
                        <input type="tel" name='phoneUser' id="phoneUser" placeholder="Số điện thoại..." required />

                        <label htmlFor="Diachi">Địa chỉ nhận hàng:</label>
                        <input type="text" name='Diachi' id="Diachi" placeholder="Địa chỉ nhận hàng cụ thể..." required />

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
                    <div className="payment-methods" name="pttt">
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