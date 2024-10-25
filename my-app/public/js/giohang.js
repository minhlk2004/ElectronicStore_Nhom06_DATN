document.addEventListener('DOMContentLoaded', function() {
    const cartRows = document.querySelectorAll('.cart-table tbody tr');
  
    cartRows.forEach(row => {
        const decreaseBtn = row.querySelector('.decrease');
        const increaseBtn = row.querySelector('.increase');
        const deleteBtn = row.querySelector('.delete-btn');
        const quantityDisplay = row.querySelector('.quantity');
        const priceElement = row.querySelector('td:nth-child(3)');
        const totalElement = row.querySelector('td:nth-child(5)');
        
        let price = parseFloat(priceElement.textContent.replace('$', ''));
        
        // Hàm cập nhật số lượng và giá
        function updateQuantity(isIncrease) {
            let quantity = parseInt(quantityDisplay.textContent);
            
            if (isIncrease) {
            quantity++;
            } else {
            if (quantity > 1) {
                quantity--;
            }
            }
            
            // Cập nhật số lượng hiển thị
            quantityDisplay.textContent = quantity;
            
            // Cập nhật tổng tiền cho sản phẩm này
            let newTotal = price * quantity;
            totalElement.textContent = `${newTotal.toFixed(2)}`;
            
            // Cập nhật tổng tiền giỏ hàng
            updateCartTotal();
        }
    
        // Sự kiện giảm số lượng
        decreaseBtn.addEventListener('click', function() {
            updateQuantity(false); // Giảm số lượng
        });
    
        // Sự kiện tăng số lượng
        increaseBtn.addEventListener('click', function() {
            updateQuantity(true); // Tăng số lượng
        });
    
        // Sự kiện xóa sản phẩm
        deleteBtn.addEventListener('click', function() {
            row.remove(); // Xóa sản phẩm khỏi bảng
            updateCartTotal(); // Cập nhật tổng tiền giỏ hàng
        });
    });
  
    // Hàm cập nhật tổng tiền giỏ hàng
    function updateCartTotal() {
        const cartTotalElement = document.querySelector('.cart-total h3');
        const totalCells = document.querySelectorAll('.cart-table tbody tr td:nth-child(5)');
        
        let totalCart = 0;
        totalCells.forEach(cell => {
            let productTotal = parseFloat(cell.textContent.replace('$', ''));
            totalCart += productTotal;
        });
        
        cartTotalElement.textContent = `Total: ${totalCart.toFixed(2)}`;
    }
});
  