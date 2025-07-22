import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/", protect, createProduct); 
router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
