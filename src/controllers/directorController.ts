import { Request, Response } from "express";
import { Director } from "../models";

/**
 * Director Controller
 * Handles all CRUD operations for directors
 */

/**
 * Get all directors
 * @route GET /directors
 */
export const getAllDirectors = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const directors = await Director.findAll({
      order: [
        ["last_name", "ASC"],
        ["first_name", "ASC"],
      ],
    });
    const filteredDirectors = directors.map((director) => ({
      id: director.id,
      firstName: director.first_name,
      lastName: director.last_name,
      image: director.image,
    }));
    res.json(filteredDirectors);
  } catch (error) {
    console.error("Error fetching directors:", error);
    res.status(500).json({ message: "Error fetching directors" });
  }
};

/**
 * Get a single director by ID
 * @route GET /directors/:id
 */
export const getDirectorById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const director = await Director.findByPk(id);

    if (!director) {
      res.status(404).json({ message: "Director not found" });
      return;
    }

    res.json(director);
  } catch (error) {
    console.error("Error fetching director:", error);
    res.status(500).json({ message: "Error fetching director" });
  }
};

/**
 * Create a new director
 * @route POST /directors
 */
export const createDirector = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      firstName: first_name,
      lastName: last_name,
      nationality,
      image,
      birthday,
    } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !nationality || !image || !birthday) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const director = await Director.create({
      first_name,
      last_name,
      nationality,
      image,
      birthday: new Date(birthday),
    });

    res.status(201).json(director);
  } catch (error) {
    console.error("Error creating director:", error);
    res.status(500).json({ message: "Error creating director" });
  }
};

/**
 * Update a director
 * @route PUT /directors/:id
 */
export const updateDirector = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      firstName: first_name,
      lastName: last_name,
      nationality,
      image,
      birthday,
    } = req.body;

    const director = await Director.findByPk(id);

    if (!director) {
      res.status(404).json({ message: "Director not found" });
      return;
    }

    // Update fields if provided
    if (first_name) director.first_name = first_name;
    if (last_name) director.last_name = last_name;
    if (nationality) director.nationality = nationality;
    if (image) director.image = image;
    if (birthday) director.birthday = new Date(birthday);

    await director.save();
    res.json(director);
  } catch (error) {
    console.error("Error updating director:", error);
    res.status(500).json({ message: "Error updating director" });
  }
};

/**
 * Delete a director
 * @route DELETE /directors/:id
 */
export const deleteDirector = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const director = await Director.findByPk(id);

    if (!director) {
      res.status(404).json({ message: "Director not found" });
      return;
    }

    await director.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting director:", error);
    res.status(500).json({ message: "Error deleting director" });
  }
};
