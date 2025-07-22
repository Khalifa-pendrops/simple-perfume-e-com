"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Product", productSchema);
