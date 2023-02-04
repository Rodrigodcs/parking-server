import {Router} from "express"
import * as clientsController from "../controllers/clientsController.js"
import {creditValidator, infoValidator} from "../middlewares/clientsValidator.js"
import tagValidator from "../middlewares/tagValidator.js"


const clientsRouter = Router()

clientsRouter.post("/clients/tag", tagValidator, clientsController.optionSelector)
clientsRouter.post("/clients/register", infoValidator, clientsController.register)
clientsRouter.post("/clients/credit", creditValidator, clientsController.addCredit)
clientsRouter.get("/clients/info", clientsController.getClientInfo)
clientsRouter.get("/clients/information", clientsController.waitingClientInfo)

export default clientsRouter;