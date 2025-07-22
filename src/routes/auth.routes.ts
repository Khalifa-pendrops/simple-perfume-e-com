import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

console.log("Entered auth route");

router.post("/register", register);
router.post("/login", login);

export default router;
