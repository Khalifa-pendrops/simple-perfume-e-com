"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatase = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const connectDatase = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log("This MongoDB Database has been connected successfully 🚀");
    }
    catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
};
exports.connectDatase = connectDatase;
