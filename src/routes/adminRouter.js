import {Router} from "express";
import * as adminController from "../controllers/adminController.js";
import loginValidator from "../middlewares/loginValidator.js";

const adminRouter = Router();

adminRouter.post("/admin/login", loginValidator, adminController.login);

export default adminRouter;