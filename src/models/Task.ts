import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
    title: string;
    description: string;
    status: "todo" | "in-progress" | "done";
    priority: "low" | "medium" | "high";
    dueDate: Date;
    user: mongoose.Types.ObjectId;
}

const taskSchema = new Schema<ITask>(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: ["todo", "in-progress", "done"],
            default: "todo"
        },

        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium"
        },

        dueDate: {
            type: Date,
            required: true
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model<ITask>("Task", taskSchema);