import { Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { CustomRequest } from "../middleware/authMiddleware";

export const getProfile = async (
    req: CustomRequest,
    res: Response
) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
};

export const updateProfile = async (
    req: CustomRequest,
    res: Response
) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = await bcrypt.hash(
                req.body.password,
                10
            );
        }

        await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
};