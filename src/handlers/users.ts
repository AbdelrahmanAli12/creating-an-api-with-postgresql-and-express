import jwt from "jsonwebtoken";
import express from "express";
import { dbUsers } from "../models/users";
export type Users = {
  authenticate(username: String, password: any): unknown;
  password(username: String, password: any): unknown;
  user_id: Number;
  username: String;
  firstname: String;
  lastname: String;
  password_digest: String;
};
const create = async (req: Request, res: Response) => {
  const user: Users = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const newUser = await dbUsers.create(user);
    var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err + user);
  }
};
const authenticate = async (req: Request, res: Response) => {
  const user: Users = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const u = await user.authenticate(user.username, user.password);
    var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET);
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};
