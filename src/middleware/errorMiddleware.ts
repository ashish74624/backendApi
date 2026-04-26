import { Request, Response, NextFunction } from "express";

export const notFound = (
    req: Request,
    res: Response
) => {
    res.status(404).json({
        message: "Route not found"
    });
};

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Server Error"
    });
};