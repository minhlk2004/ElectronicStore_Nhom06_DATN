// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu'; // Import Menu
import './Header.css';

const Header = () => {
    return (
        <header>
            <div className="container">
                <div className="logo">
                    <h1>ElectronicStore</h1>
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Tìm kiếm..." />
                    <button>Tìm kiếm</button>
                </div>
                <div className="auth">
                    <Link to="/login">Đăng Nhập</Link>
                    <Link to="/signup">Đăng Ký</Link>
                </div>
                <div className="cart">
                    <Link to="/cart">Giỏ hàng</Link>
                </div>
                <div className="location">
                    <select id="city">
                        <option value="tphcm">TP. Hồ Chí Minh</option>
                        <option value="hanoi">Hà Nội</option>
                        <option value="lamdong">Lâm Đồng</option>
                        <option value="travinh">Trà Vinh</option>
                        <option value="vinhlong">Vĩnh Long</option>
                        <option value="cantho">Cần Thơ</option>
                    </select>
                </div>
            </div>
            <Menu />
        </header>
        
    );
};

export default Header;
