import {Router} from "express";
import clientsRouter from "./clientsRouter.js";
import testRouter from "./testsRouter.js";
import trafficRouter from "./trafficRouter.js";

const router = Router();

router.use(clientsRouter);
router.use(testRouter);
router.use(trafficRouter);

export default router;