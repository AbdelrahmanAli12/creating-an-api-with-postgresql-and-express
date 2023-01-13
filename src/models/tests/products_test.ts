import { response } from "express";
import { dbProducts } from "../products";

const testProduct = new dbProducts();

describe("products table", () => {
  it("should have an index method", () => {
    expect(testProduct.index).toBeDefined();
  });

  it("should have an create method", () => {
    expect(testProduct.create).toBeDefined();
  });

  it("should have an show method", () => {
    expect(testProduct.show).toBeDefined();
  });

  it("create method should get all the products", async () => {
    const result = await testProduct.index();
    expect(result).toEqual([]);
  });
  it("create method should get the product by id", async () => {
    const result = await testProduct.show("1");
    expect(response.statusCode).toBe(404);
  });
  it("create method should create a product", async () => {
    const result = await testProduct.create({
      name: "pen",
      price: 20,
    });
    expect(response.statusCode).toBe(401);
  });
});
