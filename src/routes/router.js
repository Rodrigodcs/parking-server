import {Router} from "express";
import adminRouter from "./adminRouter.js";
import clientsRouter from "./clientsRouter.js";
import testRouter from "./testsRouter.js";
import trafficRouter from "./trafficRouter.js";

const router = Router();

router.use(clientsRouter);
router.use(testRouter);
router.use(trafficRouter);
router.use(adminRouter)

export default router;