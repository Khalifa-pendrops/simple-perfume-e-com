"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    items: [
        {
            productId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: { type: Number, required: true, default: 1 },
        },
    ],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Cart", cartSchema);
