const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser'); // Import body-parser
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;

// Sử dụng CORS
app.use(cors());
app.use(bodyParser.json()); // Thêm dòng này để phân tích cú pháp JSON
// Phục vụ các tệp tĩnh từ thư mục 'public'
app.use(express.static(path.join(__dirname, 'public')));
const router = express.Router(); // Khai báo router

// Cấu hình kết nối đến cơ sở dữ liệu
const db  = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'du_an'
});

// Kết nối đến cơ sở dữ liệu
db .connect(err => {
    if (err) {
        console.error('Kết nối thất bại:', err);
        return;
    }
    console.log('Kết nối thành công đến cơ sở dữ liệu');
});

// Tạo một endpoint để lấy dữ liệu
app.get('/api/products', (req, res) => {
    db .query('SELECT * FROM product', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});
// Tạo một endpoint để lấy danh sách danh mục
app.get('/api/categories', (req, res) => {
    db .query('SELECT * FROM categories', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});
// Tạo endpoint để lấy sản phẩm theo categoryID
app.get('/api/products/category/:categoryId', (req, res) => {
    const categoryId = req.params.categoryId;
    db .query('SELECT * FROM product WHERE categoryID = ?', [categoryId], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results); // Đảm bảo rằng ID nằm trong các sản phẩm
    });
});
const handleAddToCart = async (productId, quantity) => {
    const userId = "123"; // ID người dùng (thay bằng ID thực tế)
    try {
        const response = await fetch(`http://localhost:3000/api/carts/${userId}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId, quantity }), // Gửi ID sản phẩm và số lượng
        });
        const data = await response.json();
        console.log(data.message); // Hiển thị thông báo thành công
    } catch (error) {
        console.error("Error adding item to cart:", error);
    }
};

// Tạo endpoint để lấy giỏ hàng của người dùng
app.get('/api/carts/:userId', (req, res) => {
    const userId = req.params.userId;

    db .query('SELECT * FROM carts WHERE user_id = ?', [userId], (err, cartResults) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (cartResults.length === 0) {
            return res.json({ cart: null, items: [] });
        }

        const cartId = cartResults[0].id;

        db .query('SELECT * FROM cart_items WHERE cart_id = ?', [cartId], (err, itemResults) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json({ cart: cartResults[0], items: itemResults });
        });
    });
});

// Tạo endpoint để thêm sản phẩm vào giỏ hàng
app.post('/api/carts/:userId/items', express.json(), (req, res) => {
    const userId = req.params.userId;
    const { productId, quantity } = req.body;

    // Lấy hoặc tạo giỏ hàng cho người dùng
    db .query('SELECT * FROM carts WHERE user_id = ?', [userId], (err, cartResults) => {
        if (err) {
            return res.status(500).send(err);
        }

        let cartId;
        if (cartResults.length === 0) {
            // Nếu không có giỏ hàng, tạo giỏ hàng mới
            db .query('INSERT INTO carts (user_id, created_at) VALUES (?, NOW())', [userId], (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                cartId = result.insertId; // Lấy ID của giỏ hàng mới tạo
                addItemToCart(cartId, productId, quantity, res); // Thêm sản phẩm vào giỏ hàng
            });
        } else {
            cartId = cartResults[0].id;
            addItemToCart(cartId, productId, quantity, res); // Thêm sản phẩm vào giỏ hàng
        }
    });
});

// Hàm để thêm sản phẩm vào giỏ hàng
const addItemToCart = (cartId, productId, quantity, res) => {
    db .query('SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?', [cartId, productId], (err, existingItemResults) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (existingItemResults.length > 0) {
            // Nếu sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
            db .query('UPDATE cart_items SET quantity = quantity + ? WHERE id = ?', [quantity, existingItemResults[0].id], (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.json({ message: 'Sản phẩm đã được thêm vào giỏ hàng.' });
            });
        } else {
            // Nếu sản phẩm chưa tồn tại, thêm mới
            db .query('INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)', [cartId, productId, quantity], (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.json({ message: 'Sản phẩm đã được thêm vào giỏ hàng.' });
            });
        }
    });
};

// Tạo endpoint để xóa sản phẩm khỏi giỏ hàng
app.delete('/api/carts/:userId/items/:itemId', (req, res) => {
    const itemId = req.params.itemId;

    db .query('DELETE FROM cart_items WHERE id = ?', [itemId], (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Sản phẩm đã được xóa khỏi giỏ hàng.' });
    });
});
// Thêm logging để biết lỗi cụ thể
app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    db .query('SELECT * FROM product WHERE id = ?', [productId], (err, results) => {
        if (err) {
            console.error("Database query error:", err); // Ghi lỗi vào console
            return res.status(500).send("Internal Server Error");
        }
        if (results.length === 0) {
            return res.status(404).send("Product not found");
        }
        res.json(results[0]);
    });
});

app.get('/api/products/category/:categoryId', (req, res) => {
    const categoryId = req.params.categoryId;
    const sql = 'SELECT * FROM products WHERE categoryID = ?';
  
    db .query(sql, [categoryId], (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json(results);
    });
  }); 

// API để đăng ký người dùng
app.post('/api/signup', (req, res) => {
    const { fullname, username, email, password } = req.body;
  
    const query = 'INSERT INTO user (fullname, username, email, password) VALUES (?, ?, ?, ?)';
    
    db .query(query, [fullname, username, email, password], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err); // In lỗi ra console
        return res.status(500).send({ message: 'Đã xảy ra lỗi khi đăng ký!' });
      }
      res.status(201).send({ message: 'Đăng ký thành công!' });
    });
});

// API để đăng nhập người dùng
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM user WHERE username = ? AND password = ?';
    
    db .query(query, [username, password], (err, result) => {
      if (err) {
        console.error('Error querying data:', err);
        return res.status(500).send({ message: 'Đã xảy ra lỗi khi đăng nhập!' });
      }
      if (result.length === 0) {
        return res.status(401).send({ message: 'Tên đăng nhập hoặc mật khẩu không chính xác!' });
      }

      // Trả về thông tin người dùng
      const user = result[0];
      res.status(200).send({
        message: 'Đăng nhập thành công!',
        fullname: user.fullname // Trả về fullname
      });
    });
});


// Sử dụng router
app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
