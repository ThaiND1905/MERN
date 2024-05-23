import { Request, Response } from "express"
import User from "../models/user.model"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken"


export const signup = async (req:Request, res :Response) => {
    try{
        const {fullName,userName,password,confirmPassword,gender} = req.body;

        if(password !== confirmPassword) {
            res.status(400).json({error:"Passwords do not match"});
        }
        
        const user = await User.findOne({userName});
        if(user){
            res.status(400).json({error: "Username already in use"});
        }
        //Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);


        //profilePic
        const boyprofilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlprofilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        const newUser = new User({
            fullName,
            userName,
            password : hashedPassword,
            gender,
            profilePic : gender === 'male' ? boyprofilePic : girlprofilePic,
        });

        if(newUser){
            //generate Token
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            userName: newUser.userName,
            profilePic: newUser.profilePic,
            })

        }
        

    }catch(error) {
        console.log("Error Signing up", (error as Error).message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const login = async (req:Request, res :Response) => {
    try{
        const {userName, password} = req.body;
        console.log(req.body);
        const user = await User.findOne({userName});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid username or password"});
        }
        
        generateTokenAndSetCookie(user._id,res);

        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic,
            })

    }catch(error){
        console.log("Error in login controller", (error as Error).message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const logout = async (req:Request, res :Response) => {
    try{
        res.cookie("jwt","",{maxAge: 0});
        res.status(200).json({message: "Logged out successfully!!"});
    }catch(err){
        console.log("Error in logout controller", (err as Error).message);
        res.status(500).json({ error: "Internal Server Error"})
    }
}