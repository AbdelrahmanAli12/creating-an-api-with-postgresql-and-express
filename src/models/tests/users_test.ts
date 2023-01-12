import { dbUsers } from "../users";

const testUsers = new dbUsers();

describe("products table", () => {
  it("should have an index method", () => {
    expect(testUsers.index).toBeDefined();
  });
});
