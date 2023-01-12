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
});
