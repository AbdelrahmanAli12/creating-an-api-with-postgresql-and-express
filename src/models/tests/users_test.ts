import { response } from "express";
import usersRoute from "../../handlers/users";
import { dbUsers, Users } from "../users";

const testUsers = new dbUsers();

describe("users table", () => {
  it("should have an authenticate method", () => {
    expect(testUsers.authenticate).toBeDefined();
  });
  it("should have a create method", () => {
    expect(testUsers.create).toBeDefined();
  });
  it("should have a show method", () => {
    expect(testUsers.show).toBeDefined();
  });
  it("should have an index method", () => {
    expect(testUsers.index).toBeDefined();
  });
  //

  it("index method should return a list of users", async () => {
    const result = await testUsers.index();
    expect(result).toEqual(result);
  });

  it("create method should add a user", async () => {
    const result = await testUsers.create("test4", "test", "ali", "123");
    expect(response.statusCode).toBe(200);
  });
  it("show method should return the correct user", async () => {
    const result = await testUsers.show("1");
    expect(response.statusCode).toBe(200);
  });
  it("show method should authenticate the user", async () => {
    const result = await testUsers.authenticate("abdelrahman", "123");
    expect(response.statusCode).toBe(200);
  });
});
