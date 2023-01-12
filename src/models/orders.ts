import Client from "../database";

export type orders = {
  order_id: Number;
  user_id: Number;
  status: Boolean;
};
export type orderProducts = {
  orderProducts_id: Number;
  quantity: Number;
  productId: Number;
  orderId: Number;
};

export class dbUserOrderProducts {
  async create(o: orders): Promise<orders> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO orders(user_id,status) Values($1,$2) RETURNING *";
      const result = await conn.query(sql, [o.user_id, o.status]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`order cannot be created ${err}`);
    }
  }
  async addProductsToOrder(o: orderProducts): Promise<orderProducts> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO orderProducts(quantity,productId,orderId) Values($1,$2,$3) RETURNING *";
      const result = await conn.query(sql, [
        o.quantity,
        o.productId,
        o.orderId,
      ]);
      const addedProducts = result.rows[0];
      conn.release();
      return addedProducts;
    } catch (err) {
      throw new Error(`products cannot be added ${err}`);
    }
  }

  async show(id: string): Promise<orders> {
    try {
      const sql = "SELECT * FROM orders WHERE user_id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }
}
