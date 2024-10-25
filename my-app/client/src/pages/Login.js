    // Login.js
    import React from 'react';
    import { Link } from 'react-router-dom'; // Nếu bạn sử dụng react-router-dom
    import './Auth.css'; // Đảm bảo bạn đã tạo file CSS này

    const Login = () => {
        const handleSubmit = (event) => {
            event.preventDefault(); // Ngăn chặn reload trang khi submit
            // Thêm logic xử lý đăng nhập ở đây
        };

        return (
            <div className="login">
                <div className="login-container">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h2>ĐĂNG NHẬP</h2>
                        <br />
                        <div className="input-field">
                            <input type="text" id="username" required />
                            <label htmlFor="username">Tên đăng nhập</label>
                        </div>
                        <div className="input-field">
                            <input type="password" id="password" required />
                            <label htmlFor="password">Mật khẩu</label>
                        </div>
                        <button type="submit" className="login-btn">Đăng nhập</button>
                        <Link to="/"><p className="forgot-password">Quay lại</p></Link>
                        <p className="forgot-password">Quên mật khẩu?</p>
                        <p className="forgot-password">
                            Bạn chưa có tài khoản: 
                            <Link to="/signup" style={{ color: '#2f80ed' }}> Đăng ký</Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    };

    export default Login;
