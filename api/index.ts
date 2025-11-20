import createApp from "../src/app";
import sequelize from "../src/config/database";
import "../src/models";

let isInitialized = false;

const initDb = async () => {
  if (isInitialized) return;
  
  try {
    await sequelize.authenticate();
    console.log("✅ DB connected");
    await sequelize.sync({ alter: false });
    isInitialized = true;
  } catch (error) {
    console.error("❌ DB error:", error);
    throw error;
  }
};

const app = createApp();

// Initialize DB on first request
app.use(async (req, res, next) => {
  try {
    await initDb();
    next();
  } catch (error) {
    res.status(500).json({ 
      error: "Database connection failed",
      details: process.env.NODE_ENV === "development" ? String(error) : undefined
    });
  }
});

export default app;
