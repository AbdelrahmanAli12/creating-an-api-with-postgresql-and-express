import { Request, Response, Router } from "express";
import { dbUsers, Users } from "../models/users";
import jwt, { Secret } from "jsonwebtoken";
const DBusers = new dbUsers();
const usersRoute = Router();
const { TOKEN_SECRET } = process.env;
const tokenSecret = TOKEN_SECRET as Secret;

const createUser = async (req: Request, res: Response) => {
  const username = req.body.username;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const password_digest = req.body.password_digest;
  try {
    const newUser = await DBusers.create(
      username,
      firstname,
      lastname,
      password_digest
    );
    var token = jwt.sign({ user: newUser }, tokenSecret);
    res.json(token);
  } catch (err: unknown) {
    res.status(400);
    res.json(`${err} + ${username}`);
  }
};

const authenticateUser = async (req: Request, res: Response) => {
  const user = {
    username: req.body.username,
    password_digest: req.body.password,
  };
  try {
    const u = await DBusers.authenticate(
      user.username as string,
      user.password_digest as string
    );
    var token = jwt.sign({ user: u }, tokenSecret);
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization as String;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, tokenSecret);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
  try {
    const result = await DBusers.index();
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

const getUsersById = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization as String;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, tokenSecret);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
  try {
    const userId = req.params.userId;
    const result = await DBusers.show(userId);
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

usersRoute.get("/", getUsers);
usersRoute.get("/:userId", getUsersById);
usersRoute.post("/create", createUser);
usersRoute.post("/authenticate", authenticateUser);

export default usersRoute;
