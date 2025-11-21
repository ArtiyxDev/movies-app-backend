import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";

/**
 * Creates and configures the Express application
 */
const createApp = (): Application => {
  const app = express();

  // Middleware
  app.use(cors({ origin: "*" })); // Enable CORS for all routes
  app.use(express.json()); // Parse JSON request bodies
  app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
  app.use(morgan("dev")); // HTTP request logger

  // Health check endpoint
  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Debug endpoint (remove in production)
  app.get("/debug", (req: Request, res: Response) => {
    res.json({
      env: {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT,
        DB_HOST: process.env.DB_HOST,
        DB_NAME: process.env.DB_NAME,
        DB_USER: process.env.DB_USER,
        HAS_DB_PASSWORD: !!process.env.DB_PASSWORD,
        HAS_DATABASE_URL: !!process.env.DATABASE_URL,
      },
      routes: app._router.stack
        .filter((r: any) => r.route)
        .map((r: any) => ({
          path: r.route.path,
          methods: Object.keys(r.route.methods),
        })),
    });
  });

  // Root endpoint
  app.get("/", (req: Request, res: Response) => {
    res.json({
      message: "Movies API",
      version: "1.0.0",
      endpoints: {
        health: "/health",
        debug: "/debug",
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
