import { Router } from "express";
import {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  setMovieGenres,
  setMovieActors,
  setMovieDirectors,
} from "../controllers/movieController";

const router = Router();

/**
 * Movie Routes
 * Base path: /movies
 */

// Standard CRUD routes
router.get("/", getAllMovies); // GET /movies
router.get("/:id", getMovieById); // GET /movies/:id
router.post("/", createMovie); // POST /movies
router.put("/:id", updateMovie); // PUT /movies/:id
router.delete("/:id", deleteMovie); // DELETE /movies/:id

// Special routes for managing relationships
router.post("/:id/genres", setMovieGenres); // POST /movies/:id/genres
router.post("/:id/actors", setMovieActors); // POST /movies/:id/actors
router.post("/:id/directors", setMovieDirectors); // POST /movies/:id/directors

export default router;
