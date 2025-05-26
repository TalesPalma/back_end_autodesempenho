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


  router.post('/login', async (request, reply) => {
    try {
      const result = await service.loginUserDatabase(request.body as User)
      console.log("TESTE", result)
      return reply.code(201).send({ usuarios: result.rows })

    } catch (error) {
      console.log(` Erro ao logar ${error}`)
      return reply.code(404).send({ error: error })
    }
  })


  interface Params {
    id: number
  }
  router.get('/info/:id', async (request, reply) => {
    try {
      const { id }: Params = request.params as Params;
      const result = await service.getInfosUser(id);

      if (result == null) {
        return {
          Message: "Not found infos user"
        }
      }
      return result.rows
    } catch (error) {
      return error
    }
  });



}






