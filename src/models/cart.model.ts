import { Schema, model } from "mongoose";
import { ref } from "process";

const cartSchema = new Schema(
  {
    userId: { type: String, required: true },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

export default model("Cart", cartSchema); 
