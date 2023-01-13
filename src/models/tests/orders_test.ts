import { response } from "express";
import { dbUserOrderProducts } from "../orders";

const testOrder = new dbUserOrderProducts();

describe("orders table", () => {
  it("should have an index method", () => {
    expect(testOrder.create).toBeDefined();
  });
  it("should have an addProductsToOrder method", () => {
    expect(testOrder.addProductsToOrder).toBeDefined();
  });
  it("should have a show method", () => {
    expect(testOrder.show).toBeDefined();
  });

  it("should create order", () => {
    const result = testOrder.create("1");
    expect(response.statusCode).toBe(200);
  });
  // it("should add a product to order", () => {
  //   const r = testOrder.addProductsToOrder({
  //     quantity: 1,
  //     productId: 1,
  //     orderId: 1,
  //   });
  //   expect(response.statusCode).toBe(200);
  // });
  it("should show the order", () => {
    const result = testOrder.show("1");
    expect(response.statusCode).toBe(200);
  });
});
