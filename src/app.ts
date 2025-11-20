import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import routes from "./routes";

/**
 * Creates and configures the Express application
 */
const createApp = (): Application => {
  const app = express();

  // Middleware
  // app.use(cors({ origin: "*" })); // Enable CORS for all routes
  app.use(express.json()); // Parse JSON request bodies
  app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
  app.use(morgan("dev")); // HTTP request logger

  // Health check endpoint
  app.get("/", (req: Request, res: Response) => {
    res.json({
      message: "Movies API",
      version: "1.0.0",
      endpoints: {
        genres: "/genres",
        actors: "/actors",
        directors: "/directors",
        movies: "/movies",
      },
    });
  });

  // API Routes
  app.use("/", routes);

  // 404 handler
  app.use((req: Request, res: Response) => {
    res.status(404).json({ message: "Route not found" });
  });

  // Error handling middleware
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Error:", err);
    res.status(500).json({
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  });

  return app;
};

export default createApp;
