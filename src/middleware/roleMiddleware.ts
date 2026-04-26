import { Response, NextFunction } from "express";
import { CustomRequest } from "./authMiddleware";

export const adminOnly = (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Admin access only"
        });
    }

    next();
};