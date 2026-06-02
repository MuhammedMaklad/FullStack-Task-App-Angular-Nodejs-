import cors from "cors";
import express from "express";
import { corsOptions } from "./config/cors.config";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware";
import { requestLogger } from "./middleware/logger.middleware";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
const app = express();
app.use(requestLogger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
