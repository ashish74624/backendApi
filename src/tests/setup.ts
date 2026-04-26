import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI as string);
});

afterAll(async () => {
    await mongoose.connection.close();
});