import { Router } from "express";
import {
  addToCart,
  getCart,
  checkoutCart,
} from "../controllers/cart.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/add", protect, addToCart);
router.get("/:userId", getCart);
router.post("/checkout/:userId", protect, checkoutCart);

export default router; 
