"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (id) => jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //check if user exists
        const existingUser = await user_model_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json("User already exists!");
            return;
        }
        //if o user, then create user
        const user = await user_model_1.default.create({ name, email, password });
        //generate token and attach to user
        const token = generateToken(user._id.toString());
        res.status(200).json({ user, token });
    }
    catch (error) {
        console.error("Failed to create user"),
            res.status(500).json("Error creating user");
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await user_model_1.default.findOne({ email });
        //verify user and password
        if (!user || !(await user.matchPassword(password))) {
            res.status(401).json({ message: "Invalid credentials!" });
            return;
        }
        const token = generateToken(user?._id.toString());
        res.json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    }
    catch (error) {
        console.error("Failed to login user");
        res.status(500).json("Error logging in user");
    }
};
exports.login = login;
