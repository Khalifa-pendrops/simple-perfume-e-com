import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import jwt from "jsonwebtoken";

const generateToken = (id: string) =>
  jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "7d" });

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    //check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json("User already exists!");
      return;
    }

    //if o user, then create user
    const user = await User.create({ name, email, password });

    //generate token and attach to user
    const token = generateToken(user._id.toString());

    res.status(200).json({ user, token });
  } catch (error) {
    console.error("Failed to create user"),
      res.status(500).json("Error creating user");
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

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
  } catch (error) {
    console.error("Failed to login user");
    res.status(500).json("Error logging in user");
  }
};
