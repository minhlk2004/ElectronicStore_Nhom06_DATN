import React from 'react';
import './Banner.css';

const Banner = () => {
    return (
        <section className="banner">
            <div className="banner-content">
                <h2>Chào mừng bạn đến với ElectronicStore!</h2>
                <p>Khám phá sản phẩm mới nhất và ưu đãi hấp dẫn.</p>
                <button className="cta-button">Khám Phá Ngay</button>
            </div>
        </section>
    );
};

export default Banner;