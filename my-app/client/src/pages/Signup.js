// Signup.js
import React from 'react';
import { Link } from 'react-router-dom'; // Nếu bạn sử dụng react-router-dom
import './Signup.css'; // Đảm bảo đường dẫn đúng đến tệp CSS của bạn

const Signup = () => {
  return (
    <div class="signup">
      <div className="signup-container">
        <form className="signup-form">
          <h2>ĐĂNG KÝ</h2>
          <br />
          <div className="input-field">
            <input type="text" id="fullname" required />
            <label htmlFor="fullname">Họ và tên</label>
          </div>
          <div className="input-field">
            <input type="email" id="email" required />
            <label htmlFor="email">Gmail</label>
          </div>
          <div className="input-field">
            <input type="text" id="username" required />
            <label htmlFor="username">Tên đăng nhập</label>
          </div>
          <div className="input-field">
            <input type="password" id="password" required />
            <label htmlFor="password">Mật khẩu</label>
          </div>
          <div className="input-field">
            <input type="password" id="confirm-password" required />
            <label htmlFor="confirm-password">Nhập lại mật khẩu</label>
          </div>
          <button type="submit" className="signup-btn">Đăng ký</button>
          <Link to="/"><p className="already-member">Quay lại</p></Link>
          <p className="already-member">Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Signup;