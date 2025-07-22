import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    id: { type: String },
    name: { type: String, required: true },
    model: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    starRating: { type: Number, default: 0 },
    price: { type: Number, required: true },
    likes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    category: { type: String, required: true }, 
  },
  { timestamps: true }
);

export default model("Product", productSchema);
