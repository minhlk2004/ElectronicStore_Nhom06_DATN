import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext'; // Import useCart
import './ProductDetails.css';

function ProductDetails() {
    const { productId } = useParams(); 
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { handleAddToCart } = useCart(); // Lấy hàm handleAddToCart từ context
    const navigate = useNavigate(); // Khởi tạo useNavigate
    
    useEffect(() => {
        // Cuộn về đầu trang
        window.scrollTo(0, 0);

        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/products/${productId}`);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to fetch product details');
                }
                const productData = await response.json();
                setProduct(productData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product details:', error);
                setError(error.message);
                setLoading(false);
            }
        };
        fetchProductDetails();
    }, [productId]);

    const handleAddToCartClick = () => {
        if (product) {
            handleAddToCart({
                id: product.id,
                img: product.img,
                name: product.name,
                price: product.price,
            });
            navigate('/cart');
        }
    };

    const handleCheckoutClick = () => {
        if (product) {
            handleAddToCart({
                id: product.id,
                img: product.img,
                name: product.name,
                price: product.price,
            });
            navigate('/checkout');
        }
    };

    if (loading) return <p>Đang tải dữ liệu sản phẩm...</p>;
    if (error) return <p>Lỗi: {error}</p>;
    if (!product) return null;

    return (
        <div className="product-details-1">
            <div className="product-image">
                <img src={`${process.env.PUBLIC_URL}/img/${product.img}`} alt={product.name} />
            </div>

            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="price_sale">Giá: {product.price}.000<sub>đ</sub></p>
                <p className="price_original"><del>{product.oldprice}.000<sub>đ</sub></del></p>
                <p className="discount">Giảm: -{product.discount}%</p>
                <br />
                <hr />

                <div className="button-grid">
                    <button className="add-to-cart" onClick={handleAddToCartClick}>Thêm vào giỏ hàng</button>
                    <button className="add-to-cart" onClick={handleCheckoutClick}>Thanh Toán</button>
                    <button class="call-me">Gọi lại cho tôi</button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;