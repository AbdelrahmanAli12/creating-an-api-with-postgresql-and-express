# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index '/products' [GET]
- Show  '/products/:id' [GET]
- Create [token required] '/products/create' [POST]

#### Users
- Index [token required] '/users' [GET]
- Show [token required]  '/users/:id' [GET]
- Create [token required] '/users/create' [POST]

#### Orders
- Current Order by user (args: user id)[token required] '/order/:id'[GET]

## Data Shapes
#### Product
-  id SERIAL PRIMARY KEY
- name VARCAHR
- price INTEGER

#### User
- id SERIAL PRIMARY KEY
- username VARCHAR
- firstName VARCHAR
- lastName VARCHAR
- password VARCHAR

#### Orders
- id SERIAL PRIMARY KEY
- user_id FOREIGN KEY REFRENCE user(id)
- status of order (false or true) 
true = completed
false = active

### OrderProducts 
- id SERIAL PRIMARY KEY
-quantity of the product
-product id FOREIGN KEY REFRENCE product(id)
-order id FOREIGN KEY REFRENCE order(id)



## API Reference

#### Get all the products

```http
  GET /products
```
#### Get products by Id

```http
  GET /products/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of the product   |

#### To create a product

```http
  POST /products/create
```

| body      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. name of the product   |
| `price`      | `string` | **Required**. price of the product   |

#### Get all the users

```http
  GET /users
```
#### Get users by Id

```http
  GET /users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of the user   |

#### To create a user

```http
  POST /users/create
```

| body      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. name of the user   |
| `firstname`      | `string` | **Required**. firstname of the user   |
| `lastname`      | `string` | **Required**. lastname of the user   |
| `password_digest` | `string` | **Required**. password for the user   |

#### To authenticate a user

```http
  POST /users/authenticate
```

| body      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. name of the user   |
| `firstname`      | `string` | **Required**. firstname of the user   |
| `lastname`      | `string` | **Required**. lastname of the user   |
| `password_digest` | `string` | **Required**. password for the user   |


#### Get products by Id

```http
  GET /orders/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of the order   |

#### To create an order

```http
  POST /orders/createOrder
```

| body      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_id`      | `string` | **Required**. the user id   |

#### To add products to order

```http
  POST /orders/addProductsToOrder
```

| body      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `quantity`      | `number` | **Required**. number needed from this product   |
| `productId`      | `string` | **Required**. the product id   |
| `orderId`      | `string` | **Required**. the order id   |





## DB Schema

### DB overview

| Schema |     Name      | Type  |  Owner  |
|:-------|:--------------|:------|:--------|
 public | migrations    | table | postgres
 public | orderproducts | table | postgres
 public | orders        | table | postgres
 public | products      | table | postgres
 public | users         | table | postgres

### users table


|user_id | username | firstname | lastname | password_digest|
|-------|:----------|:----------|:---------|:----------------|

### products table


|product_id | name | price |
|-------|:----------|:----------|

### orders table

|order_id | userid | status |
|-------|:----------|:----------|

### order products table

|orderproducts_id | quantity | productid |orderid |
|-------|:----------|:----------|:----------|







