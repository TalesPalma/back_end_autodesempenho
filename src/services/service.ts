import { Pool, QueryResult } from "pg";
import { Database } from "../bd/connectionsBd"
import { User, UserDAO } from "../models/user";
import { Console, log } from "node:console";


export class Service {



  private pool: Pool

  constructor() {
    const database = new Database
    this.pool = database.initConnection()
  }

  async getInfosUser(id: number): Promise<QueryResult<UserDAO> | null> {
    const result = await this.pool.query("SELECT * FROM usuarios WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      console.log("Caius aqui")
      return null
    }

    return result
  }


  async testeConectionsBd(): Promise<QueryResult<User>> {
    const result = this.pool.query("Select * from usuarios");
    return result;
  }


  async registerUserDataBase(body: User): Promise<QueryResult<User>> {
    const newUser = body
    const result = await this.pool.query(`INSERT INTO usuarios(nome,email,senha) VALUES ($1,$2,$3) RETURNING *`,
      [
        newUser.nome,
        newUser.email,
        newUser.senha
      ]
    )
    return result
  }


  async loginUserDatabase(body: User): Promise<QueryResult<User>> {
    const email = body.email
    const senha = body.senha
    const result = await this.pool.query(`
      SELECT  email , senha 
      FROM usuarios 
      WHERE email = $1 AND senha = $2`
      , [email, senha]);

    return result;
  }





}




