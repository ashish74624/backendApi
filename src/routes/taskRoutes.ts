import express from "express";
import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} from "../controllers/taskController";
import { validate } from "../middleware/validate";
import { taskSchema } from "../validators/taskValidator";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();


router.post(
    "/",
    protect,
    validate(taskSchema),
    createTask
);
router.get("/", protect, getTasks);
router.get("/:id", protect, getTaskById);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

export default router;