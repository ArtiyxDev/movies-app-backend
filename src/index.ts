import dotenv from "dotenv";
import createApp from "./app";
import sequelize from "./config/database";
import "./models"; // Import models to ensure associations are set up

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

/**
 * Initialize database and start server
 */
const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully");

    // Sync database models
    // In production, use migrations instead of sync
    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({ alter: true });
    } else {
      // In production, just sync without altering
      await sequelize.sync();
    }
    console.log("✅ Database models synchronized");

    // Create and start Express app
    const app = createApp();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`📍 API URL: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to start server:", error);
    process.exit(1);
  }
};

// Start the server
startServer();
