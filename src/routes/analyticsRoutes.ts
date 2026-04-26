import express from "express";
import { protect } from "../middleware/authMiddleware";
import { getTaskAnalytics } from "../controllers/analyticsController";

const router = express.Router();

router.get("/tasks", protect, getTaskAnalytics);

export default router;