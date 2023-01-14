import Client from "../database";
import bcrypt from "bcrypt";
const { SALT_ROUNDS } = process.env;
const saltRounds = SALT_ROUNDS as string;
const pepper = "dkfsd$sdjd$kfe%";

export type Users = {
  user_id?: Number;
  username: String;
  firstname: String;
  lastname: String;
  password_digest: String;
};

export class dbUsers {
  async create(
    username: String,
    firstname: String,
    lastname: String,
    password: String
  ): Promise<Users> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO users(username,firstname,lastname,password_digest) VALUES($1,$2,$3,$4) RETURNING *";
      const hash = bcrypt.hashSync(password + pepper, parseInt(saltRounds));
      const result = await conn.query(sql, [
        username,
        firstname,
        lastname,
        hash,
      ]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not add new user ${username}. Error: ${err}`);
    }
  }
  async authenticate(
    username: string,
    password: string
  ): Promise<Users | null> {
    const conn = await Client.connect();
    const sql =
      "SELECT user_id,username,password_digest FROM users WHERE username=($1)";

    const result = await conn.query(sql, [username]);

    if (result.rows.length) {
      const user = result.rows[0];

      console.log(user);

      if (bcrypt.compareSync(password + pepper, user.password_digest)) {
        return user;
      }
    }

    return null;
  }

  async index(): Promise<Users[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Users> {
    try {
      const sql = "SELECT * FROM users WHERE user_id=($1)";
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }
}
