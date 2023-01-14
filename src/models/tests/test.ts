import { response, request } from "express";
import { dbProducts, Products } from "../products";
import { dbUsers, Users } from "../users";
import { dbUserOrderProducts, orderProducts, orders } from "../orders";
const testProduct = new dbProducts();
const testOrder = new dbUserOrderProducts();
const testUsers = new dbUsers();
describe("usermodel", () => {
  it("create user and authenticate him and show all users", async () => {
    const result = await testUsers.create(
      "testUsername",
      "testFirstname",
      "testLastname",
      "123"
    );
    expect(result.username).toEqual("testUsername");
    expect(result.firstname).toEqual("testFirstname");
    expect(result.lastname).toEqual("testLastname");
    //
    const result1 = await testUsers.authenticate("testUsername", "123");
    console.log("res------------> " + JSON.stringify(result1));
    expect(JSON.stringify(result1?.user_id)).toBeGreaterThanOrEqual(0);
    //
    const result2 = await testUsers.index();
    expect(result2.length).toBeGreaterThanOrEqual(0);
  });
});

describe("products", () => {
  it("should create a new product and show product by id and get all products", async () => {
    const result = await testProduct.create({
      name: "testProduct",
      price: 200,
    });
    expect(result.name).toEqual("testProduct");
    expect(result.price).toEqual(200);
    //
    const result1 = await testProduct.show("1");
    console.log(JSON.stringify(result1));
    expect(JSON.stringify(result1.product_id)).toBeGreaterThanOrEqual(0);
    //
    const result3 = testProduct.index();
    expect((await result3).length).toBeGreaterThanOrEqual(0);
  });
});

describe("order", () => {
  it("should create order and return all products", async () => {
    const result = await testOrder.create("1");
    expect(result?.status).toEqual(false);
    //
    const result1 = await testOrder.index();
    expect(JSON.stringify(result1[0].status)).toEqual("false");
    //
    const result2 = await testOrder.show("1");
    expect(result2.status).toEqual(false);
    //
    const result3 = await testOrder.addProductsToOrder({
      quantity: 1,
      productId: 1,
      orderId: 1,
    });
    expect(result3.quantity).toEqual(1);
  });
});
