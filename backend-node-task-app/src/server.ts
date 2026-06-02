import app from "./app";
import { connectDB } from "./config/db.config";
import { config } from "./config/env.config";

const startServer = async () => {
  await connectDB();

  app.listen(config.port, () => {
    console.log(`Server running http://localhost:3000`);
    console.log(
      `Server running on port ${config.port} in ${config.nodeEnv} mode`,
    );
  });
};

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
