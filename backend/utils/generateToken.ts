import jwt, { Secret } from 'jsonwebtoken'
import { TokenAge } from '../constants/tokenAge';

const generateTokenAndSetCookie = (userId : any, res : any) => {
    const secret_ket = process.env.JWT_SECRET
    if (secret_ket) {
        const token = jwt.sign({userId}, secret_ket,{
        expiresIn : '15d',
    });
    res.cookie("jwt",token,{
        maxAge : TokenAge.maxAge,
        httpOnly : true,
        sameSite : "strict",
        secure : process.env.NODE_ENV === "production",
    })
    }
    
}

export default generateTokenAndSetCookie;