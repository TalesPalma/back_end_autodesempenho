import Fastify, { FastifyInstance } from 'fastify'



export default class Servidor {

  private port: number
  private fast: FastifyInstance

  constructor(port: number) {
    this.port = port
    this.fast = Fastify({
      logger: true
    })

  }

  public initServer() {
    this.fast.listen({ port: this.port }).then(
      address => {
        this.fast.log.info(`Servidor rodando na porta ${address}`)
      }
    ).catch(err => {
      this.fast.log.error(err)
    }
    )
  }

  public getFastify(): FastifyInstance {
    return this.fast
  }


}







