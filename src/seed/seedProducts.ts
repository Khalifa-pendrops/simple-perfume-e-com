import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product.model";

dotenv.config();

const products = Array.from({ length: 42 }, (_, i) => ({
  name: `Perfume ${i + 1}`,
  model: `Model-${1000 + i}`,
  description: `Aluxurious fragrance blend number ${i + 1}.`,
  image: `https://via.placeholder.com/150?text=Perfume+${i + 1}`,
  starRating: Math.floor(Math.random() * 5) + 1,
  price: Number((Math.random() * 100 + 50).toFixed(2)),
  likes: Math.floor(Math.random() * 200),
  shares: Math.floor(Math.random() * 100),
  category: ["Floral", "Woody", "Citrus", "Spicy"][
    Math.floor(Math.random() * 4)
  ],
}));

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(async () => {
    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("About 42 products seeded! 🚀");
  })
  .catch((err) => {
    console.error("Failed to seed products", err);
  });
