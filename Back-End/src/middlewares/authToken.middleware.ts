import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyAuthTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization

    if(!token){
        return res.status(401).json({message: "Missing authorization token."})
    }

    token = token.split(" ")[1]

    jwt.verify(token as string, "SECRET_KEY" as string, (err: any, decoded: any) => {
        if(err){
            return res.status(401).json({ message: "Invalid Token." });
        }

        next()
    })
}

export default verifyAuthTokenMiddleware
