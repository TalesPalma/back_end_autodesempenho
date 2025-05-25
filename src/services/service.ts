import { Pool, QueryResult } from "pg";
import { Database } from "../bd/connectionsBd"
import { User } from "../models/user";


export class Service {

  private pool: Pool

  constructor() {
    const database = new Database
    this.pool = database.initConnection()
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
    const result = await this.pool.query("SELECT  * from usuarios");
    return result;
  }





}




