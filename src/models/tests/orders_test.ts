import { dbUserOrderProducts } from "../orders";

const testOrder = new dbUserOrderProducts();

describe("products table", () => {
  it("should have an index method", () => {
    expect(testOrder.create).toBeDefined();
  });
});
