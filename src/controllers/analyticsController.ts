import { Response } from "express";
import Task from "../models/Task";
import { CustomRequest } from "../middleware/authMiddleware";

export const getTaskAnalytics = async (
    req: CustomRequest,
    res: Response
) => {
    try {
        const filter =
            req.user.role === "admin"
                ? {}
                : { user: req.user._id };

        const totalTasks = await Task.countDocuments(filter);

        const statusStats = await Task.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        const priorityStats = await Task.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: "$priority",
                    count: { $sum: 1 }
                }
            }
        ]);

        const completedTasks = await Task.countDocuments({
            ...filter,
            status: "done"
        });

        const pendingTasks = await Task.countDocuments({
            ...filter,
            status: { $ne: "done" }
        });

        const productivity =
            totalTasks === 0
                ? 0
                : ((completedTasks / totalTasks) * 100).toFixed(2);

        res.status(200).json({
            success: true,

            summary: {
                totalTasks,
                completedTasks,
                pendingTasks,
                productivityPercentage: `${productivity}%`
            },

            tasksByStatus: statusStats,

            tasksByPriority: priorityStats
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
};