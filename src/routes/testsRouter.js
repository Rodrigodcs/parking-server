import {Router} from "express";
import * as testController from "../controllers/testController.js";

const testRouter = Router();

testRouter.get("/test", testController.getTest);
testRouter.post("/test", testController.postTest);
testRouter.get("/test/health", testController.health);
testRouter.post("/test/esp", testController.postEsp);

export default testRouter;