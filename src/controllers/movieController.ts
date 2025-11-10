import { Request, Response } from "express";
import { Movie, Genre, Actor, Director } from "../models";

/**
 * Movie Controller
 * Handles all CRUD operations for movies and related associations
 */

/**
 * Get all movies with their genres, actors, and directors
 * @route GET /movies
 */
export const getAllMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const movies = await Movie.findAll({
      include: [
        { model: Genre, as: "genres", through: { attributes: [] } },
        { model: Actor, as: "actors", through: { attributes: [] } },
        { model: Director, as: "directors", through: { attributes: [] } },
      ],
      order: [["name", "ASC"]],
    });
    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Error fetching movies" });
  }
};

/**
 * Get a single movie by ID with its genres, actors, and directors
 * @route GET /movies/:id
 */
export const getMovieById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByPk(id, {
      include: [
        { model: Genre, as: "genres", through: { attributes: [] } },
        { model: Actor, as: "actors", through: { attributes: [] } },
        { model: Director, as: "directors", through: { attributes: [] } },
      ],
    });

    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }

    res.json(movie);
  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).json({ message: "Error fetching movie" });
  }
};

/**
 * Create a new movie
 * @route POST /movies
 */
export const createMovie = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, image, synopsis, release_year } = req.body;

    // Validate required fields
    if (!name || !image || !synopsis || !release_year) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const movie = await Movie.create({
      name,
      image,
      synopsis,
      release_year,
    });

    res.status(201).json(movie);
  } catch (error) {
    console.error("Error creating movie:", error);
    res.status(500).json({ message: "Error creating movie" });
  }
};

/**
 * Update a movie
 * @route PUT /movies/:id
 */
export const updateMovie = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, image, synopsis, release_year } = req.body;

    const movie = await Movie.findByPk(id);

    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }

    // Update fields if provided
    if (name) movie.name = name;
    if (image) movie.image = image;
    if (synopsis) movie.synopsis = synopsis;
    if (release_year) movie.release_year = release_year;

    await movie.save();
    res.json(movie);
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({ message: "Error updating movie" });
  }
};

/**
 * Delete a movie
 * @route DELETE /movies/:id
 */
export const deleteMovie = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);

    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }

    await movie.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).json({ message: "Error deleting movie" });
  }
};

/**
 * Set genres for a movie
 * @route POST /movies/:id/genres
 * @body Array of genre IDs
 */
export const setMovieGenres = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const genreIds = req.body;

    // Validate that body is an array
    if (!Array.isArray(genreIds)) {
      res.status(400).json({ message: "Body must be an array of genre IDs" });
      return;
    }

    const movie = await Movie.findByPk(id);

    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }

    // Set the genres (this will replace existing associations)
    await (movie as any).setGenres(genreIds);

    // Fetch and return the updated genres
    const updatedGenres = await (movie as any).getGenres();
    res.json(updatedGenres);
  } catch (error) {
    console.error("Error setting movie genres:", error);
    res.status(500).json({ message: "Error setting movie genres" });
  }
};

/**
 * Set actors for a movie
 * @route POST /movies/:id/actors
 * @body Array of actor IDs
 */
export const setMovieActors = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const actorIds = req.body;

    // Validate that body is an array
    if (!Array.isArray(actorIds)) {
      res.status(400).json({ message: "Body must be an array of actor IDs" });
      return;
    }

    const movie = await Movie.findByPk(id);

    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }

    // Set the actors (this will replace existing associations)
    await (movie as any).setActors(actorIds);

    // Fetch and return the updated actors
    const updatedActors = await (movie as any).getActors();
    res.json(updatedActors);
  } catch (error) {
    console.error("Error setting movie actors:", error);
    res.status(500).json({ message: "Error setting movie actors" });
  }
};

/**
 * Set directors for a movie
 * @route POST /movies/:id/directors
 * @body Array of director IDs
 */
export const setMovieDirectors = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const directorIds = req.body;

    // Validate that body is an array
    if (!Array.isArray(directorIds)) {
      res
        .status(400)
        .json({ message: "Body must be an array of director IDs" });
      return;
    }

    const movie = await Movie.findByPk(id);

    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }

    // Set the directors (this will replace existing associations)
    await (movie as any).setDirectors(directorIds);

    // Fetch and return the updated directors
    const updatedDirectors = await (movie as any).getDirectors();
    res.json(updatedDirectors);
  } catch (error) {
    console.error("Error setting movie directors:", error);
    res.status(500).json({ message: "Error setting movie directors" });
  }
};
