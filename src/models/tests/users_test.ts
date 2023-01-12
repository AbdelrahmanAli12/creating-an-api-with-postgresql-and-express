import { dbUsers } from "../users";

const testUsers = new dbUsers();

describe("products table", () => {
  it("should have an index method", () => {
    expect(testUsers.index).toBeDefined();
  });
});

describe("products table", () => {
  it("should have an authenticate method", () => {
    expect(testUsers.authenticate).toBeDefined();
  });
});

describe("products table", () => {
  it("should have a create method", () => {
    expect(testUsers.create).toBeDefined();
  });
});

describe("products table", () => {
  it("should have a show method", () => {
    expect(testUsers.show).toBeDefined();
  });
});
