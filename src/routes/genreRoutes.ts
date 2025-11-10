import { Router } from "express";
import {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
} from "../controllers/genreController";

const router = Router();

/**
 * Genre Routes
 * Base path: /genres
 */

router.get("/", getAllGenres); // GET /genres
router.get("/:id", getGenreById); // GET /genres/:id
router.post("/", createGenre); // POST /genres
router.put("/:id", updateGenre); // PUT /genres/:id
router.delete("/:id", deleteGenre); // DELETE /genres/:id

export default router;
