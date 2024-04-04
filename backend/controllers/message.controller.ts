import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import Conversation from "../models/conversation.model";
import Message from "../models/message.model";


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

export const sendMessage = async(req: Request, res: Response) => {
    try{
        const {message} = req.body;
        const {id : receiverId} = req.params;
        //middleware
        const senderId = (req as CustomRequest).user._doc._id.toHexString();

        let conversation = await Conversation.findOne({
          participants: [senderId, receiverId],
        })

        if(!conversation){
          conversation = await Conversation.create({
            participants: [senderId, receiverId],
          })
        }
        
        const newMessage = new Message({
          senderId,
          receiverId,
          message,
        })


        if (newMessage) {
          conversation.messages.push(newMessage._id);
        }
        // console.log(senderId);

        // Socket io goes here vì ứng dụng cho các realtime application

        await Promise.all([conversation.save(),newMessage.save()]);

        res.status(201).json(newMessage);


    }catch(error){
      console.log("Error in getMessage controller:", (error as Error).message);
      res.status(500).json({error: "Internal Server Error"});
    }
}

export const getMessage = async (req: Request, res: Response) => {
  try{
    const { id : userToChatId} = req.params;
    const senderId = (req as CustomRequest).user._doc._id.toHexString();

    const conversation = await Conversation.findOne({
      participants: {$all : [ senderId , userToChatId ] }
    }).populate("messages");
    
    if(!conversation){
      return res.status(200).json([]);
    }

    const message = conversation.messages;

    res.status(200).json(message);

  }catch(error){
    console.log("Error in getMessage controller:", (error as Error).message);
    res.status(500).json({error: "Internal Server Error"});
  }
}