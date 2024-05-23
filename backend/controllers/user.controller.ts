import { Request, Response } from "express";
import User from "../models/user.model";
import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

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


export const getUsersForSiderBar = async (req : Request, res : Response) => {
    try{
        const loggedInUserId = (req as CustomRequest).user._doc._id.toHexString();
        const filteredUsers = await User.find({_id: {$ne:loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers);
    }catch(error){

    }
}