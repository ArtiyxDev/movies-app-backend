import dotenv from "dotenv";
import createApp from "../src/app";
import sequelize from "../src/config/database";
import "../src/models"; // Import models to ensure associations are set up

// Load environment variables
dotenv.config();

/**
 * Vercel Serverless Function Handler
 * This file is the entry point for Vercel deployment
 */

let isDbInitialized = false;

/**
 * Initialize database connection (only once)
 */
const initializeDatabase = async () => {
  if (isDbInitialized) return;

  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully");

    // Sync database models
    await sequelize.sync({ alter: process.env.NODE_ENV === "development" });
    console.log("✅ Database models synchronized");

    isDbInitialized = true;
  } catch (error) {
    console.error("❌ Unable to connect to database:", error);
    throw error;
  }
};

// Create Express app
const app = createApp();

// Initialize database on first request
app.use(async (req, res, next) => {
  if (!isDbInitialized) {
    try {
      await initializeDatabase();
    } catch (error) {
      return res.status(500).json({
        message: "Database initialization failed",
        error:
          process.env.NODE_ENV === "development" ? String(error) : undefined,
      });
    }
  }
  next();
});

// Export for Vercel
export default app;
