import { Router } from "express";
import protectedController from "../controllers/protected.controller.js";
import publicController from "../controllers/public.controller.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

const router = Router();

router.use(authenticationMiddleware);

router.get("/", protectedController.dashboard);
router.get("/logout", publicController.logout);

export default router;