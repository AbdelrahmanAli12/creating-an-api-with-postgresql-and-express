CREATE TABLE orders(
order_id SERIAL PRIMARY KEY, 
userId  SERIAL REFERENCES users(user_id),
status BOOLEAN DEFAULT false
);
