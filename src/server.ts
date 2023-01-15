import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import productsRoute from "./handlers/products";
import usersRoute from "./handlers/users";
import ordersRoute from "./handlers/orders";

const app: express.Application = express();
const address: string = "8000";

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.sendFile("index.html", { root: "./src" });
});

app.listen(8000, function () {
  console.log(`starting app on: ${address}`);
});

app.use("/products", productsRoute);
app.use("/users", usersRoute);
app.use("/orders", ordersRoute);

export default app;
