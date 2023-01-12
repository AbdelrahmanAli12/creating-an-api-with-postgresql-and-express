import { dbProducts, Products } from "../models/products";
import { Request, Response, Router } from "express";
import jwt, { Secret } from "jsonwebtoken";

const DBProducts = new dbProducts();
const productsRoute = Router();
const { TOKEN_SECRET } = process.env;
const tokenSecret = TOKEN_SECRET as Secret;
//get all products
const getProduct = async (req: Request, res: Response): Promise<void> => {
  DBProducts.index();
};

//get products by id
const getProductById = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  DBProducts.show(id);
};

//create product
const createProduct = async (req: Request, res: Response): Promise<void> => {
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
    const Products: Products = {
      name: req.body.name as String,
      price: req.body.price as Number,
    };
    DBProducts.create(Products);
  } catch (err) {
    res.json("error creating product");
    return;
  }
};

productsRoute.get("/", getProduct);
productsRoute.get("/:id", getProductById);
productsRoute.post("/create", createProduct);

export default productsRoute;
