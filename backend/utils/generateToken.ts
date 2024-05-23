import jwt, { Secret } from 'jsonwebtoken'
import { TokenAge } from '../constants/tokenAge';
import { Response } from 'express';

const generateTokenAndSetCookie = (userId : any, res : Response) => {
    const secret_ket = process.env.JWT_SECRET
    if (secret_ket) {
        const token = jwt.sign({userId}, secret_ket,{
        expiresIn : '15d',
    });
    res.cookie("jwt",token,{
        maxAge : TokenAge.maxAge,
        httpOnly : true,
        sameSite : "strict",
    })
    }
    
}

export default generateTokenAndSetCookie;