import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import productsRoute from "./handlers/products";
import usersRoute from "./handlers/users";
import ordersRoute from "./handlers/orders";
const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

app.use("/products", productsRoute);
app.use("/users", usersRoute);
app.use("/orders", ordersRoute);
