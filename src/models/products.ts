import Client from "../database";

export type Products = {
  product_id?: Number;
  name: String;
  price: Number;
};

export class dbProducts {
  async index(): Promise<Products[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM products";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      console.log(err);
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Products> {
    try {
      const sql = "SELECT * FROM products WHERE product_id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async create(b: Products): Promise<Products> {
    try {
      const sql =
        "INSERT INTO products (name, price) VALUES($1,$2) RETURNING *";

      const conn = await Client.connect();

      const result = await conn.query(sql, [b.name, b.price]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${b.name}. Error: ${err}`);
    }
  }
}
