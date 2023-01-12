import { Request, Response, Router } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { dbUserOrderProducts, orders, orderProducts } from "../models/orders";

const DBuserOrderProducts = new dbUserOrderProducts();
const ordersRoute = Router();

const { TOKEN_SECRET } = process.env;
const tokenSecret = TOKEN_SECRET as Secret;

const getUserOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
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
    const order: orders = {
      user_id: req.body.user_id,
    };
    const result = await DBuserOrderProducts.create(order);
    res.json(result);
  } catch (err) {
    res.json("cannot create order");
  }
};

const addProductsToOrder = async (req: Request, res: Response) => {
  const product: orderProducts = {
    quantity: req.body.quantity,
    productId: req.body.productId,
    orderId: req.body.orderId,
  };
  try {
    const result = await DBuserOrderProducts.addProductsToOrder(product);
    res.json(result);
  } catch (err) {
    res.json("cannot add products to order");
  }
};

ordersRoute.get("/:id", getUserOrder);
ordersRoute.post("/createOrder", createOrder);
ordersRoute.post("/addProductsToOrder", addProductsToOrder);

export default ordersRoute;
