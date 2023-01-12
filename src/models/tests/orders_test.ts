import { dbUserOrderProducts } from "../orders";

const testOrder = new dbUserOrderProducts();

describe("products table", () => {
  it("should have an index method", () => {
    expect(testOrder.create).toBeDefined();
  });
});

describe("products table", () => {
  it("should have an addProductsToOrder method", () => {
    expect(testOrder.addProductsToOrder).toBeDefined();
  });
});

describe("products table", () => {
  it("should have a show method", () => {
    expect(testOrder.show).toBeDefined();
  });
});
