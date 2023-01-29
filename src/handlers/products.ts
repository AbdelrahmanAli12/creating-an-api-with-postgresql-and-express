import { dbProducts, Products } from "../models/products";
import { Request, Response, Router } from "express";
import jwt, { Secret } from "jsonwebtoken";

const DBProducts = new dbProducts();
const productsRoute = Router();
const { TOKEN_SECRET } = process.env;
const tokenSecret = TOKEN_SECRET as Secret;

//get all products
const getProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const authorizationHeader = req.headers.authorization as String;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, tokenSecret);
  } catch (err) {
    res.status(403);
    res.send("Access denied, invalid token");
    return;
  }
  try {
    const result = await DBProducts.index();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

//get products by id
const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const result = await DBProducts.show(id);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

//create product
const createProduct = async (req: Request, res: Response): Promise<void> => {
 
  try {
    const authorizationHeader = req.headers.authorization as String;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, tokenSecret);
  } catch (err) {
    res.status(403);
    res.send("Access denied, invalid token");
    return;
  }
  try {
    const Products: Products = {
      name: req.body.name as String,
      price: req.body.price as Number,
    };
    const result = await DBProducts.create(Products);
    res.send(result);
  } catch (err) {
    res.send("error creating product");
    return;
  }
};

productsRoute.get("/", getProduct);
productsRoute.get("/:id", getProductById);
productsRoute.post("/create", createProduct);

export default productsRoute;
