import { Request, Response } from "express";
import Product from "../models/product.model";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await Product.create(req.body);

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json("Error creatting product"); 
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json("Error getting products:");
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json("Product not found!");
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json("Error getting product");
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Error updating product" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(deletedProduct);
  } catch (error) {
    console.error("Deleting error"),
      res.status(500).json("Error deleting product");
  }
};
