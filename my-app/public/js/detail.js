
    let quantity = 1; // Giá trị mặc định của số lượng

    function increaseQuantity() {
        quantity++;
        document.getElementById("quantity-display").innerText = quantity;
    }

    function decreaseQuantity() {
        if (quantity > 1) {
            quantity--;
            document.getElementById("quantity-display").innerText = quantity;
        }
    }
