// Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../components/UserContext'; // Import UserContext để lưu thông tin người dùng
import './Auth.css';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();
    const { setUser } = useUser(); // Lấy hàm setUser từ context

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/login', {
                username: formData.username,
                password: formData.password,
            });

            // Lưu fullname vào UserContext
            setUser({ fullname: response.data.fullname });
            console.log(response.data.message);
            alert("Đăng nhập thành công!");
            navigate('/'); // Điều hướng đến trang chủ
        } catch (error) {
            console.error("Error logging in:", error.response?.data?.message || error.message);
            alert("Đăng nhập không thành công!");
        }
    };

    return (
        <div className="login">
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>ĐĂNG NHẬP</h2>
                    <br />
                    <div className="input-field">
                        <input 
                            type="text" 
                            id="username" 
                            required 
                            value={formData.username}
                            onChange={handleChange} 
                        />
                        <label htmlFor="username">Tên đăng nhập</label>
                    </div>
                    <div className="input-field">
                        <input 
                            type="password" 
                            id="password" 
                            required 
                            value={formData.password}
                            onChange={handleChange} 
                        />
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