import { dbProducts } from "../products";

const testProduct = new dbProducts();

describe("products table", () => {
  it("should have an index method", () => {
    expect(testProduct.index).toBeDefined();
  });
});
