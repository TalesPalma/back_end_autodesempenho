import { controller } from "./controller/controller";
import { Service } from "./services/service";
import Servidor from "./Servidor";

const servidor = new Servidor(3000)
controller(servidor.getFastify(), new Service)
servidor.initServer()



