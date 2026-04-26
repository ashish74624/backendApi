import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export interface CustomRequest extends Request {
    user?: any;
}

export const protect = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];

            const decoded: any = jwt.verify(
                token,
                process.env.JWT_SECRET as string
            );

            const user = await User.findById(decoded.id).select("-password");

            if (!user) {
                return res.status(401).json({
                    message: "User not found"
                });
            }

            req.user = user;
            return next();
        }

        return res.status(401).json({
            message: "No token provided"
        });

    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
};