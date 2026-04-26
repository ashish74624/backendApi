import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
    user?: any;
}

export const protect = (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];

        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET as string
            );

            req.user = decoded;
            next();

        } catch (error) {
            return res.status(401).json({
                message: "Invalid token"
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            message: "No token provided"
        });
    }
};