import { Router } from "express";
import protectedController from "../controllers/protected.controller.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

const router = Router();

router.use(authenticationMiddleware);

router.get("/logout", protectedController.logout);

export default router;