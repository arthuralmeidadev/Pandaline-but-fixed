import { Router } from "express";
import publicController from "../controllers/public.controller.js";
import protectedController from "../controllers/protected.controller.js";

const router = Router();

router.get("/", publicController.homepage);
router.get("/view-product", publicController.viewProduct);
router.post("/login", protectedController.login);
router.get("/refresh-access", protectedController.refreshAccess);

export default router;