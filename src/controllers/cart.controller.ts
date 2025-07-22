import { Request, Response } from "express";
import Cart from "../models/cart.model";

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId }); //each user is supposed to have a cart

    //check if cart exists. if no, create a new cart with these properties
    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      //if there is an item in the cart
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
      await cart.save();
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding cart"),
      res.status(500).json("Internal server or Cart adding error");
  }
};

export const getCart = async (req: Request, res: Response) => {
  try {
    const { userId: userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      res.status(404).json("No cart found!");
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error getting cart"),
      res.status(500).json("Ineternal server error getting cart");
  }
};

export const checkoutCart = async (req: Request, res: Response) => {
  try {
    const { userId: userId } = req.params;
    const cart = await Cart.findOneAndDelete({ userId });

    if (!cart) {
      res.status(404).json("No cart found!");
    }

    res.status(200).json("Checkout successful and cart deleted");
  } catch (error) {
    console.error("Error checking out and deleting cart"),
      res
        .status(500)
        .json("Ineternal server error checking out and deleting cart");
  }
};
