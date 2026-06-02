import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  origin: "http://localhost:4200",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204,
};
