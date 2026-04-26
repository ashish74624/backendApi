import { Response } from "express";
import Task from "../models/Task";
import { CustomRequest } from "../middleware/authMiddleware";

export const createTask = async (
    req: CustomRequest,
    res: Response
) => {
    try {
        const task = await Task.create({
            ...req.body,
            user: req.user._id
        });

        res.status(201).json(task);

    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
};

export const getTasks = async (
    req: CustomRequest,
    res: Response
) => {
    try {
        let tasks;

        if (req.user.role === "admin") {
            tasks = await Task.find().populate("user", "name email");
        } else {
            tasks = await Task.find({
                user: req.user._id
            });
        }

        res.status(200).json(tasks);

    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
};

export const getTaskById = async (
    req: CustomRequest,
    res: Response
) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        if (
            req.user.role !== "admin" &&
            task.user.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        res.status(200).json(task);

    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
};

export const updateTask = async (
    req: CustomRequest,
    res: Response
) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        if (
            req.user.role !== "admin" &&
            task.user.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({
                message: "Only owner can update"
            });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedTask);

    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
};

export const deleteTask = async (
    req: CustomRequest,
    res: Response
) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        if (
            req.user.role !== "admin" &&
            task.user.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({
                message: "Only owner can delete"
            });
        }

        await task.deleteOne();

        res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
};