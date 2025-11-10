import { Router } from "express";
import genreRoutes from "./genreRoutes";
import actorRoutes from "./actorRoutes";
import directorRoutes from "./directorRoutes";
import movieRoutes from "./movieRoutes";

const router = Router();

/**
 * API Routes Index
 * Combines all route modules
 */

router.use("/genres", genreRoutes);
router.use("/actors", actorRoutes);
router.use("/directors", directorRoutes);
router.use("/movies", movieRoutes);

export default router;
