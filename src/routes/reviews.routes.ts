import { Router } from "express";
import {
  addReview,
  getReviewsForProduct,
} from "../controllers/review.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/:id", protect, addReview);
router.get("/:id", getReviewsForProduct);

export default router; 
