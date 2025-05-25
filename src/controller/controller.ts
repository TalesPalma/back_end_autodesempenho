import { FastifyInstance } from "fastify"
import { User } from "../models/user"
import { Service } from "../services/service"


export async function controller(router: FastifyInstance, service: Service) {

  router.get('/teste-db', async (_request, _reply) => {
    const result = service.testeConectionsBd()
    return { messagem: result }
  })


  router.post('/register', async (request, reply) => {
    try {
      const newUser = request.body as User
      const result = await service.registerUserDataBase(newUser)
      return reply.code(201).send({ usuarios: result.rows[0] });

    } catch (error) {
      console.log(`ERROR WITH POST (REGISTER USER) ${error}`)
      return reply.code(500).send({ error: error })
    }
  });


  router.get('/login', async (request, reply) => {
    try {
      const result = await service.loginUserDatabase(request.body as User)
      return reply.code(201).send({ usuarios: result.rows })

    } catch (error) {
      console.log(`ERROR EM RECUPERAR LISTA DE USERS ${error}`)
      return reply.code(201).send({ error: error })
    }
  })


}






