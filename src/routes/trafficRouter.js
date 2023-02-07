import {Router} from "express"
import * as trafficController from "../controllers/trafficController.js"
import tagValidator from "../middlewares/tagValidator.js"

const trafficRouter = Router()

trafficRouter.post("/check-in", tagValidator, trafficController.checkIn)
trafficRouter.post("/check-out", tagValidator, trafficController.checkOut)
trafficRouter.get("/traffic/parked", trafficController.getParked)

export default trafficRouter;