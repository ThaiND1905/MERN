import mongoose from "mongoose";
import { Types } from "mongoose";

export interface UserDocument extends mongoose.Document{
    userName: string;
    fullName:string;
    password:string;
    gender:string;
    createdAt: Date;
    profilePic: string;
    updatedAt: Date;
    _doc?: any;
    organization: Types.ObjectId; //This I found in the mongoose documentation. 
  }
const userSchema = new mongoose.Schema<UserDocument>({
    fullName:{
        type: String,
        required: true,
    },
    userName:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 8,
    },
    gender:{
        type: String,
        required: true,
        enum: ["male", "female"],
    },
    profilePic:{
        type: String,
        default: "",
    }
},{timestamps: true})
const User = mongoose.model('User', userSchema);
export default User;