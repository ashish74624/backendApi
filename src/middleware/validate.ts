import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const validate =
    (schema: any) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                schema.parse(req.body);
                next();
            } catch (error) {
                if (error instanceof ZodError) {
                    return res.status(400).json({
                        success: false,
                        errors: error.issues.map((err) => ({
                            field: err.path[0],
                            message: err.message
                        }))
                    });
                }

                return res.status(500).json({
                    success: false,
                    message: "Validation failed"
                });
            }
        };