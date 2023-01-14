import { Request, Response, Router } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { dbUserOrderProducts, orders, orderProducts } from "../models/orders";

const DBuserOrderProducts = new dbUserOrderProducts();
const ordersRoute = Router();

const { TOKEN_SECRET } = process.env;
const tokenSecret = TOKEN_SECRET as Secret;

const getUserOrder = async (req: Request, res: Response) => {
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
    const result = await DBuserOrderProducts.show(userId);
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

const createOrder = async (req: Request, res: Response) => {
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
    const userId = req.body.userId;
    const result = await DBuserOrderProducts.create(userId);
    res.json(result);
  } catch (err) {
    res.json("cannot create order" + err);
  }
};

const addProductsToOrder = async (req: Request, res: Response) => {
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
    const product: orderProducts = {
      quantity: req.body.quantity,
      productId: req.body.productId,
      orderId: req.body.orderId,
    };
    const result = await DBuserOrderProducts.addProductsToOrder(product);
    res.json(result);
  } catch (err) {
    res.json("cannot add products to order");
  }
};

const getOrders = async (req: Request, res: Response) => {
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
    const result = await DBuserOrderProducts.index();
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};
ordersRoute.get("/", getOrders);
ordersRoute.get("/:userId", getUserOrder);
ordersRoute.post("/createOrder", createOrder);
ordersRoute.post("/addProductsToOrder", addProductsToOrder);

export default ordersRoute;
