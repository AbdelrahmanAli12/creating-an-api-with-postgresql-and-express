import { dbProducts, Products } from "../models/products";
import { Request, Response, Router } from "express";

const DBProducts = new dbProducts();
const productsRoute = Router();

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
  const Products: Products = {
    name: req.body.name as String,
    price: req.body.price as Number,
  };
  DBProducts.create(Products);
};

productsRoute.get("/products", getProduct);
productsRoute.get("/products/:id", getProductById);
productsRoute.post("products/create", createProduct);

export default productsRoute;
