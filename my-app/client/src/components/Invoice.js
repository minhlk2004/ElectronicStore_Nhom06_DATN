import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Invoice.css';

const Invoice = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { customerInfo, totalAmount, paymentMethod, cartItems } = location.state || {};

    // Kiểm tra nếu dữ liệu thiếu và chuyển hướng về trang chủ
    if (!customerInfo || !cartItems) {
        navigate('/');
        return null;
    }

    // Hàm xử lý quay về trang chủ
    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className="body-1">
            <div className="invoice-container">
                <h1 className="invoice-title">HÓA ĐƠN THANH TOÁN THÀNH CÔNG</h1>
                <div className="customer-info">
                    <h2>Thông Tin Khách Hàng</h2>
                    <p><strong>Tên:</strong> {customerInfo.nameUser}</p>
                    <p><strong>Số điện thoại:</strong> {customerInfo.phoneUser}</p>
                    <p><strong>Địa chỉ:</strong> {customerInfo.Diachi}</p>
                </div>
                <div className="order-details">
                    <h3>Chi tiết đơn hàng:</h3>
                    <table className="invoice-table">
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Giá</th>
                                <th>Tổng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.price.toLocaleString()}.000đ</td>
                                    <td>{(product.price * product.quantity).toLocaleString()}.000đ</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="total-amount">
                        <p><strong>Tổng cộng:</strong> {totalAmount.toLocaleString()}.000đ</p>
                    </div>
                </div>
                <div className="payment-method">
                    <h3>Phương thức thanh toán:</h3>
                    <p>{paymentMethod === 'bank' ? 'Ngân hàng' : paymentMethod === 'e-wallet' ? 'Ví điện tử' : 'Thanh toán khi nhận hàng'}</p>
                </div>
                <div className="thank-you-message">
                    <p>Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi!</p>
                    <p>Chúng tôi sẽ gửi sản phẩm đến địa chỉ của bạn sớm nhất có thể.</p>
                </div>
                <div className="button-container">
                    <button onClick={handleBackToHome}>Quay Về Trang Chủ</button>
                </div>
            </div>
        </div>
    );
};

export default Invoice;