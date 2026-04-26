import { z } from "zod";

export const taskSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(3),

    status: z.enum([
        "todo",
        "in-progress",
        "done"
    ]).optional(),

    priority: z.enum([
        "low",
        "medium",
        "high"
    ]).optional(),

    dueDate: z.string()
});