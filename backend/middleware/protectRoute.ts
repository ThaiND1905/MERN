import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import mongoose, { Types } from "mongoose";


export interface CustomRequest extends Request {
  token: string | JwtPayload;
  user: {
    userName: string;
    fullName: string;
    password: string;
    gender: string;
    createdAt: Date;
    profilePic: string;
    updatedAt: Date;
    _doc?: any;
    organization: Types.ObjectId;
  }
}

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;
    const SECRET_KEY = process.env.JWT_SECRET;
    if (!token) {
      throw new Error();
    }
    if (SECRET_KEY) {
      const decoded = jwt.verify(token, SECRET_KEY);
      (req as CustomRequest).token = decoded;

      const user = await User.findById((decoded as JwtPayload).userId).select(
        "-password"
      );
      if (!user) {
        throw new Error();
      }

      (req as CustomRequest).user = user;
      
      next();
    }
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
};
