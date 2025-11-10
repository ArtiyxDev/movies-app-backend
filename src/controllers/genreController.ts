import { Request, Response } from "express";
import { Genre } from "../models";

/**
 * Genre Controller
 * Handles all CRUD operations for genres
 */

/**
 * Get all genres
 * @route GET /genres
 */
export const getAllGenres = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const genres = await Genre.findAll({
      order: [["name", "ASC"]],
    });
    res.json(genres);
  } catch (error) {
    console.error("Error fetching genres:", error);
    res.status(500).json({ message: "Error fetching genres" });
  }
};

/**
 * Get a single genre by ID
 * @route GET /genres/:id
 */
export const getGenreById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const genre = await Genre.findByPk(id);

    if (!genre) {
      res.status(404).json({ message: "Genre not found" });
      return;
    }

    res.json(genre);
  } catch (error) {
    console.error("Error fetching genre:", error);
    res.status(500).json({ message: "Error fetching genre" });
  }
};

/**
 * Create a new genre
 * @route POST /genres
 */
export const createGenre = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: "Name is required" });
      return;
    }

    const genre = await Genre.create({ name });
    res.status(201).json(genre);
  } catch (error) {
    console.error("Error creating genre:", error);
    res.status(500).json({ message: "Error creating genre" });
  }
};

/**
 * Update a genre
 * @route PUT /genres/:id
 */
export const updateGenre = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const genre = await Genre.findByPk(id);

    if (!genre) {
      res.status(404).json({ message: "Genre not found" });
      return;
    }

    if (name) {
      genre.name = name;
    }

    await genre.save();
    res.json(genre);
  } catch (error) {
    console.error("Error updating genre:", error);
    res.status(500).json({ message: "Error updating genre" });
  }
};

/**
 * Delete a genre
 * @route DELETE /genres/:id
 */
export const deleteGenre = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const genre = await Genre.findByPk(id);

    if (!genre) {
      res.status(404).json({ message: "Genre not found" });
      return;
    }

    await genre.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting genre:", error);
    res.status(500).json({ message: "Error deleting genre" });
  }
};
