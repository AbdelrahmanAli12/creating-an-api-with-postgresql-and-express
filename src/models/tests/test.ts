import { response, request } from "express";
import { dbProducts, Products } from "../products";
import { dbUsers, Users } from "../users";
import { dbUserOrderProducts, orderProducts, orders } from "../orders";
const testProduct = new dbProducts();
const testOrder = new dbUserOrderProducts();
const testUsers = new dbUsers();
const product: Products = {
  product_id: 1,
  name: "testProduct",
  price: 200,
};
const createdUser: Users = {
  user_id: 1,
  username: "abdo",
  firstname: "abdo",
  lastname: "abdo",
  password_digest: "123",
};
const createOrder: orders = {
  order_id: 1,
  userId: Number(createdUser.user_id),
};

let tempuser: Users = {
  user_id: new Number(),
  username: new String(),
  firstname: new String(),
  lastname: new String(),
  password_digest: new String(),
};
let tempOrder: orders = {
  userId: Number(tempuser.user_id),
  order_id: new Number(),
  status: false,
};
let tempProduct: Products = {
  product_id: new Number(),
  name: new String(),
  price: new Number(),
};
let createOrderProduct: orderProducts = {
  quantity: 1,
  productId: Number(tempProduct.product_id),
  orderId: Number(tempOrder.order_id),
};

describe("usermodel", () => {
  it("create method", async () => {
    const result = await testUsers.create("abdo", "abdo", "abdo", "123");
    expect(result.user_id).toEqual(createdUser.user_id);
    expect(result.firstname).toEqual(createdUser.firstname);
    expect(result.lastname).toEqual(createdUser.lastname);
    tempuser.user_id = result.user_id;
    tempuser.firstname = result.firstname;
    tempuser.lastname = result.lastname;
    tempuser.username = result.username;
    tempuser.password_digest = result.password_digest;
  });

  it("auth the user", async () => {
    const result = await testUsers.authenticate(
      String(tempuser.username),
      "123"
    );
    expect(result?.username).toEqual(undefined);
  });
  it("gets all users", async () => {
    const result = await testUsers.index();
    expect(result.length).toBeGreaterThanOrEqual(0);
  });
});

describe("products", () => {
  it("should create a new product", async () => {
    const result = await testProduct.create({
      name: "testProduct",
      price: 200,
    });
    expect(result.name).toEqual(product.name);
    expect(result.price).toEqual(product.price);
    tempProduct.product_id = result.product_id;
    tempProduct.name = result.name;
    tempProduct.price = result.price;
  });
  it("should return all the products", async () => {
    const result = testProduct.index();
    expect((await result).length).toBeGreaterThanOrEqual(0);
  });
  it("should return product by id", async () => {
    const result = await testProduct.show(String(tempProduct.product_id));
    // expect(result).toBe(0);
  });
});

describe("order", () => {
  it("should create order", async () => {
    const result = await testOrder.create(String(tempuser.user_id));
    expect(result?.status).toEqual(false);
    tempOrder.order_id = result.order_id;
    tempOrder.userId = result.userId;
  });
  it("should add product to order", async () => {
    await testOrder.addProductsToOrder(createOrderProduct);
    expect(createOrderProduct.quantity).toEqual(1);
  });
  it("should show the orders", async () => {
    const result = await testOrder.show(String(tempOrder.userId));
    expect(result.status).toEqual(false);
  });
});
