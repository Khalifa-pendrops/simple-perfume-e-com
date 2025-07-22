"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization?.startsWith("Bearer ")) {
            try {
                token = req.headers.authorization.split(" ")[1];
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                req.user = await user_model_1.default.findById(decoded.id).select("-password");
                next();
            }
            catch (error) {
                res.status(401).json({ message: "Not ahtorized. Token failed" });
            }
        }
        else {
            res.status(401).json({ message: "No token. Authorization denied" });
        }
    }
    catch (error) {
        console.error("Failed to verify token"),
            res.status(500).json("Error aunthenticating user");
    }
};
exports.protect = protect;
