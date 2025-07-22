"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutCart = exports.getCart = exports.addToCart = void 0;
const cart_model_1 = __importDefault(require("../models/cart.model"));
const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        let cart = await cart_model_1.default.findOne({ userId }); //each user is supposed to have a cart
        //check if cart exists. if no, create a new cart with these properties
        if (!cart) {
            cart = await cart_model_1.default.create({
                userId,
                items: [{ productId, quantity }],
            });
        }
        else {
            const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
            //if there is an item in the cart
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            }
            else {
                cart.items.push({ productId, quantity });
            }
            await cart.save();
        }
        res.status(200).json(cart);
    }
    catch (error) {
        console.error("Error adding cart"),
            res.status(500).json("Internal server or Cart adding error");
    }
};
exports.addToCart = addToCart;
const getCart = async (req, res) => {
    try {
        const { userId: userId } = req.params;
        const cart = await cart_model_1.default.findOne({ userId }).populate("items.productId");
        if (!cart) {
            res.status(404).json("No cart found!");
        }
        res.status(200).json(cart);
    }
    catch (error) {
        console.error("Error getting cart"),
            res.status(500).json("Ineternal server error getting cart");
    }
};
exports.getCart = getCart;
const checkoutCart = async (req, res) => {
    try {
        const { userId: userId } = req.params;
        const cart = await cart_model_1.default.findOneAndDelete({ userId });
        if (!cart) {
            res.status(404).json("No cart found!");
        }
        res.status(200).json("Checkout successful and cart deleted");
    }
    catch (error) {
        console.error("Error checking out and deleting cart"),
            res
                .status(500)
                .json("Ineternal server error checking out and deleting cart");
    }
};
exports.checkoutCart = checkoutCart;
