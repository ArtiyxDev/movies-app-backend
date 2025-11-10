import dotenv from "dotenv";
import sequelize from "../config/database";
import "../models"; // Import models to ensure associations are set up

dotenv.config();

/**
 * Script to synchronize database schema
 * This will create all tables and relationships
 */
const syncDatabase = async () => {
  try {
    console.log("🔄 Starting database synchronization...");

    await sequelize.authenticate();
    console.log("✅ Database connection established");

    // Force sync will drop existing tables and recreate them
    // Use { force: true } only in development!
    await sequelize.sync({ force: true });
    console.log("✅ Database synchronized successfully");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error synchronizing database:", error);
    process.exit(1);
  }
};

syncDatabase();
