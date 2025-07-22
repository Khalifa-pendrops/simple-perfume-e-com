import { Request, Response } from "express";
import Review from "../models/review.model";
import mongoose from "mongoose";

export const addReview = async (req: Request, res: Response) => {
  try {
    const { rating, comment } = req.body;
    const { productId } = req.params;

    const existing = await Review.findOne({ productId, userId: req.user._id });
    if (existing) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this product." });
    }

    const review = await Review.create({
      productId: new mongoose.Types.ObjectId(req.params.productId),

      userId: req.user._id,
      rating,
      comment,
    });

    res.status(200).json(review);
  } catch (error) {
    console.error("❌ Failed to add review:", error);
    res.status(500).json({ message: "Error adding review", error });
  }
};

export const getReviewsForProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.findById({ productId }).populate(
      "userId",
      "name"
    );

    res.status(201).json(reviews);
  } catch (error) {
    console.error("Fialed to get reviews");
    res.status(500).json("Error getting reviews");
  }
};
