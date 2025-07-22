"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviewsForProduct = exports.addReview = void 0;
const review_model_1 = __importDefault(require("../models/review.model"));
const mongoose_1 = __importDefault(require("mongoose"));
// export const addReview = async (req: Request, res: Response) => {
//   try {
//     const { rating, comment } = req.body;
//     const { productId } = req.params;
//     const review = await Review.create({
//       productId,
//       userId: req.user._id,
//       rating,
//       comment,
//     });
//     res.status(200).json(review);
//   } catch (error) {
//     console.error("Failed to add review");
//     res.status(500).json("Error adding review");
//   }
// };
const addReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const { productId } = req.params;
        console.log("REQ.USER:", req.user);
        console.log("PRODUCT ID:", productId);
        console.log("BODY:", { rating, comment });
        const review = await review_model_1.default.create({
            productId: new mongoose_1.default.Types.ObjectId(req.params.productId),
            userId: req.user._id, // Make sure this exists
            rating,
            comment,
        });
        res.status(200).json(review);
    }
    catch (error) {
        console.error("❌ Failed to add review:", error);
        res.status(500).json({ message: "Error adding review", error });
    }
};
exports.addReview = addReview;
const getReviewsForProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await review_model_1.default.findById({ productId }).populate("userId", "name");
        res.status(201).json(reviews);
    }
    catch (error) {
        console.error("Fialed to get reviews");
        res.status(500).json("Error getting reviews");
    }
};
exports.getReviewsForProduct = getReviewsForProduct;
