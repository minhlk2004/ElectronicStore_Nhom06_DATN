import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-section">
                    <h3>Về Chúng Tôi</h3>
                    <p>Thông tin về ElectronicStore.</p>
                </div>
                <div className="footer-section">
                    <h3>Liên Hệ</h3>
                    <p>Email: storedientuelectronic@store.store</p>
                    <p>Điện thoại: 0345-678-910</p>
                </div>
                <div className="footer-section">
                    <h3>Theo Dõi Chúng Tôi</h3>
                    <a href="#">Facebook</a>
                    <a href="#">Instagram</a>
                    <a href="#">Zalo</a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 ElectronicStore</p>
            </div>
        </footer>
    );
};

export default Footer;
