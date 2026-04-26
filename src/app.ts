import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes"

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
);

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

export default app;