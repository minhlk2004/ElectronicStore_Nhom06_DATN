// src/components/Menu.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Menu = () => {
    return (
        <nav>
            <ul className="menu">
                <li><Link to="/">Trang Chủ</Link></li>
                <li><Link to="/products">Sản Phẩm</Link></li>
                <li><Link to="/gioithieu">Giới thiệu</Link></li>
                <li><Link to="/lienhe">Liên hệ</Link></li>
                <li><Link to="/khuyenmai">Khuyến Mãi</Link></li>
                <li><Link to="/tintuc">Tin Tức</Link></li>
                <li><Link to="/hotro">Hỗ Trợ</Link></li>
            </ul>
        </nav>
    );
};

export default Menu;
