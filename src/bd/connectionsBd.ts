import { Pool } from 'pg'
import dotenv from 'dotenv'

export class Database {


  constructor() {

  }


  public initConnection(): Pool {

    dotenv.config()

    const db = new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    })


    try {
      db.query(`
      CREATE TABLE IF NOT EXISTS usuarios(
      id SERIAL PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      senha VARCHAR(255) NOT NULL,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`
      )
    }
    catch (error) {
      console.error(error)
    }



    return db

  }


}
