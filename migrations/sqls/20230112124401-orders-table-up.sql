CREATE TABLE orders(order_id SERIAL PRIMARY KEY, 
productId SERIAL REFERENCES products(product_id),
quantity INTEGER,
userId  SERIAL REFERENCES users(user_id),
status BOOLEAN 
);
