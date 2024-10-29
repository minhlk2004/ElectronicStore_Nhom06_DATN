// Signup.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate để điều hướng
import axios from 'axios';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const navigate = useNavigate(); // Khai báo useNavigate để điều hướng đến trang đăng nhập sau khi đăng ký thành công

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/signup', {
        fullname: formData.fullname,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      console.log(response.data.message); // Đăng ký thành công
      alert("Đăng ký thành công!");
      navigate('/login'); // Điều hướng đến trang đăng nhập
    } catch (error) {
      console.error("Error signing up:", error.response?.data?.message || error.message);
      alert("Đăng ký không thành công!");
    }
  };

  return (
    <div className="signup">
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>ĐĂNG KÝ</h2>
          <br />
          <div className="input-field">
            <input type="text" id="fullname" required onChange={handleChange} />
            <label htmlFor="fullname">Họ và tên</label>
          </div>
          <div className="input-field">
            <input type="email" id="email" required onChange={handleChange} />
            <label htmlFor="email">Gmail</label>
          </div>
          <div className="input-field">
            <input type="text" id="username" required onChange={handleChange} />
            <label htmlFor="username">Tên đăng nhập</label>
          </div>
          <div className="input-field">
            <input type="password" id="password" required onChange={handleChange} />
            <label htmlFor="password">Mật khẩu</label>
          </div>
          <div className="input-field">
            <input type="password" id="confirmPassword" required onChange={handleChange} />
            <label htmlFor="confirmPassword">Nhập lại mật khẩu</label>
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