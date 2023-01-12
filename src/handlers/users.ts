import { Request, Response, Router } from "express";
import { dbUsers, Users } from "../models/users";
import jwt, { Secret } from "jsonwebtoken";
const DBusers = new dbUsers();
const usersRoute = Router();
const { TOKEN_SECRET } = process.env;
const tokenSecret = TOKEN_SECRET as Secret;

const createUser = async (req: Request, res: Response) => {
  const user: Users = {
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password_digest: req.body.password_digest,
  };
  try {
    const newUser = await DBusers.create(user);
    var token = jwt.sign({ user: newUser }, tokenSecret);
    res.json(token);
  } catch (err: unknown) {
    res.status(400);
    res.json(`${err} + ${user}`);
  }
};

const authenticateUser = async (req: Request, res: Response) => {
  const user: Users = {
    username: req.body.username,
    password_digest: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
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
    const result = await DBusers.index();
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

const getUsersById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = DBusers.show(id);
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

usersRoute.get("/", getUsers);
usersRoute.get("/:id", getUsersById);
usersRoute.post("/create", createUser);
usersRoute.post("/authenticate", authenticateUser);

export default usersRoute;
