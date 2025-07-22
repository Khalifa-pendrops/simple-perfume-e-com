import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

interface CustomJwtPayload extends jwt.JwtPayload {
  id: string;
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token;

    if (req.headers.authorization?.startsWith("Bearer ")) {
      try {
        token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
          id: string;
        };
        req.user = await User.findById(decoded.id).select("-password");
        next();
      } catch (error) {
        res.status(401).json({ message: "Not ahtorized. Token failed" });
      }
    } else {
      res.status(401).json({ message: "No token. Authorization denied" });
    }
  } catch (error) {
    console.error("Failed to verify token"),
      res.status(500).json("Error aunthenticating user");
  }
};
