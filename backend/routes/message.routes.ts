import express from "express";
import { sendMessage , getMessage } from "../controllers/message.controller" 
import { protectRoute } from "../middleware/protectRoute";


export const MessageRoute = express.Router();


MessageRoute.get('/:id',protectRoute, getMessage);
MessageRoute.post('/send/:id',protectRoute, sendMessage);

