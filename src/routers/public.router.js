import { Router } from "express";
import publicController from "../controllers/public.controller.js";

const router = Router();

router.get("/", publicController.homepage);
router.get("/view-product", publicController.viewProduct);
router.post("/login", publicController.login);
router.get("/refresh-access", publicController.refreshAccess);

export default router;