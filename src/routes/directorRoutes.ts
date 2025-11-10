import { Router } from "express";
import {
  getAllDirectors,
  getDirectorById,
  createDirector,
  updateDirector,
  deleteDirector,
} from "../controllers/directorController";

const router = Router();

/**
 * Director Routes
 * Base path: /directors
 */

router.get("/", getAllDirectors); // GET /directors
router.get("/:id", getDirectorById); // GET /directors/:id
router.post("/", createDirector); // POST /directors
router.put("/:id", updateDirector); // PUT /directors/:id
router.delete("/:id", deleteDirector); // DELETE /directors/:id

export default router;
