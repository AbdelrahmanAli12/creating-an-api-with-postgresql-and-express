import { Request, Response, Router } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { dbUserOrderProducts, orders, orderProducts } from "../models/orders";

const DBuserOrderProducts = new dbUserOrderProducts();
const ordersRoute = Router();

const { TOKEN_SECRET } = process.env;
const tokenSecret = TOKEN_SECRET as Secret;

const getUserOrder = async (req: Request, res: Response) => {
  const userId = req.params.id;
  await DBuserOrderProducts.show(userId);
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
    await DBuserOrderProducts.create(order);
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
    await DBuserOrderProducts.addProductsToOrder(product);
  } catch (err) {
    res.json("cannot add products to order");
  }
};

ordersRoute.get("/order/:id", getUserOrder);
ordersRoute.post("/order/createOrder", createOrder);
ordersRoute.post("/order/addProductsToOrder", addProductsToOrder);

export default ordersRoute;
