import { Router } from "express";
import publicController from "../controllers/public.controller.js";

const router = Router();

router.get("/", publicController.homepage);
router.get("/view-product", publicController.viewProduct);

export default router;