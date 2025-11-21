import dotenv from "dotenv";
import sequelizeInstance from "../src/config/database";
import { Movie, Genre, Actor, Director } from "../src/models";

// Configure test database environment
dotenv.config();
process.env.DB_NAME = process.env.TEST_DB_NAME || "movies_test_db";
process.env.DB_USER = process.env.TEST_DB_USER || "postgres";
process.env.DB_PASSWORD = process.env.TEST_DB_PASSWORD || "postgres";
process.env.DB_HOST = process.env.TEST_DB_HOST || "localhost";
process.env.DB_PORT = process.env.TEST_DB_PORT || "5432";
delete process.env.DATABASE_URL;

const sequelize = sequelizeInstance;

// Setup test database before all tests
beforeAll(async () => {
  try {
    await sequelize.authenticate();
    console.log("✓ Test database connection established");

    // Sync database schema (force: true drops and recreates tables)
    await sequelize.sync({ force: true });
    console.log("✓ Test database synced");
  } catch (error) {
    console.error("✗ Unable to connect to test database:", error);
    throw error;
  }
});

// Clean up after each test
afterEach(async () => {
  await sequelize.query(
    "TRUNCATE TABLE movie_genres, movie_actors, movie_directors, movies, genres, actors, directors RESTART IDENTITY CASCADE;"
  );
});

// Close database connection after all tests
afterAll(async () => {
  try {
    await sequelize.close();
    console.log("✓ Test database connection closed");
  } catch (error) {
    console.error("✗ Error closing test database:", error);
  }
});

export { sequelize, Movie, Genre, Actor, Director };
