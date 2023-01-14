
# Build a Storefront Backend

This project is about building a Storefront backend using express and postgres using validation and authentication 


## Badges

![typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

![node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
## Run Locally


Go to the project directory

```bash
  cd src
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

The localhost you are running on `POSTGRES_HOST=`
The name of the DataBase at `POSTGRES_DB=`
Postgres username at `POSTGRES_USER=`
Postgres password at `POSTGRES_PASSWORD=`
#### JWT attributes:
`BCRYPT_PASSWORD=`
`SALT_ROUNDS=`
`PEPPER=`
`TOKEN_SECRET=`
#### ports
the database is running on port 5432
the backend is running on port 8000

## Connecting to the database
* first you need to start postgres
* then as in the database.json file create two data bases in postgres with the names in the .json file 
     Example:
![database](img\database.PNG)
* after that you need to grant all privileges on database (databaseName)
to $user 
Example:
![grant](img\grant.PNG)
```psql
postgres=# CREATE DATABASE store;
CREATE DATABASE
postgres=# CREATE DATABASE store_test;
CREATE DATABASE
postgres=# GRANT ALL PRIVILEGES ON DATABASE store TO postgres;
GRANT
postgres=# GRANT ALL PRIVILEGES ON DATABASE store_test TO postgres;
GRANT
```
## Running Tests

To run tests, run the following command

```bash
  npm run test
```


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
  GET /users/${userId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`      | `number` | **Required**. Id of the user   |

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


#### Get order by Id

```http
  GET /orders/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of the order   |

#### Get all orders

```http
  GET /orders
```

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





