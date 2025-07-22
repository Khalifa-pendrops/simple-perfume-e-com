"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product", required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, require: true },
    comment: { type: String },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Review", reviewSchema);
