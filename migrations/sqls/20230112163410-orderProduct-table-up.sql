CREATE TABLE orderProducts(
orderProducts_id SERIAL PRIMARY KEY,
quantity INTEGER,
productId SERIAL REFERENCES products(product_id),
orderId SERIAL REFERENCES orders(order_id)
);