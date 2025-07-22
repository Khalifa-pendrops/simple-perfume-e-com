import { Schema, model } from "mongoose";
import { ref } from "process";

const reviewSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, require: true },
    comment: { type: String },
  },
  { timestamps: true }
);

export default model("Review", reviewSchema); 
