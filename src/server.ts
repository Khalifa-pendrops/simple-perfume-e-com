import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/product.routes";
import cartRoutes from "./routes/cart.routes";
import authRoutes from "./routes/auth.routes";
import reviewRoutes from "./routes/reviews.routes";
import { connectDatase } from "./config/db";

dotenv.config();

const app = express();

const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);

app.listen(port, () => {
  connectDatase();
  console.log(`This Server is running on port ${port}`);
});
