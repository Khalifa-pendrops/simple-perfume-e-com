"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.getAllProducts = exports.createProduct = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const createProduct = async (req, res) => {
    try {
        const newProduct = await product_model_1.default.create(req.body);
        res.status(201).json(newProduct);
    }
    catch (error) {
        res.status(500).json("Error creatting product");
    }
};
exports.createProduct = createProduct;
const getAllProducts = async (req, res) => {
    try {
        const products = await product_model_1.default.find();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json("Error getting products:");
    }
};
exports.getAllProducts = getAllProducts;
const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await product_model_1.default.findById(id);
        if (!product) {
            res.status(404).json("Product not found!");
            return;
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json("Error getting product");
    }
};
exports.getProduct = getProduct;
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedProduct = await product_model_1.default.findByIdAndUpdate(id, updates, {
            new: true,
        });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: "Error updating product" });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await product_model_1.default.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(deletedProduct);
    }
    catch (error) {
        console.error("Deleting error"),
            res.status(500).json("Error deleting product");
    }
};
exports.deleteProduct = deleteProduct;
