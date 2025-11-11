import { Request, Response } from "express";
import { Actor } from "../models";

/**
 * Actor Controller
 * Handles all CRUD operations for actors
 */

/**
 * Get all actors
 * @route GET /actors
 */
export const getAllActors = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const actors = await Actor.findAll({
      order: [
        ["last_name", "ASC"],
        ["first_name", "ASC"],
      ],
    });
    res.json(
      actors.map((actor) => ({
        id: actor.id,
        firstName: actor.first_name,
        lastName: actor.last_name,
      }))
    );
  } catch (error) {
    console.error("Error fetching actors:", error);
    res.status(500).json({ message: "Error fetching actors" });
  }
};

/**
 * Get a single actor by ID
 * @route GET /actors/:id
 */
export const getActorById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const actor = await Actor.findByPk(id);

    if (!actor) {
      res.status(404).json({ message: "Actor not found" });
      return;
    }

    res.json(actor);
  } catch (error) {
    console.error("Error fetching actor:", error);
    res.status(500).json({ message: "Error fetching actor" });
  }
};

/**
 * Create a new actor
 * @route POST /actors
 */
export const createActor = async (
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

    const actor = await Actor.create({
      first_name,
      last_name,
      nationality,
      image,
      birthday: new Date(birthday),
    });

    res.status(201).json(actor);
  } catch (error) {
    console.error("Error creating actor:", error);
    res.status(500).json({ message: "Error creating actor" });
  }
};

/**
 * Update an actor
 * @route PUT /actors/:id
 */
export const updateActor = async (
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

    const actor = await Actor.findByPk(id);

    if (!actor) {
      res.status(404).json({ message: "Actor not found" });
      return;
    }

    // Update fields if provided
    if (first_name) actor.first_name = first_name;
    if (last_name) actor.last_name = last_name;
    if (nationality) actor.nationality = nationality;
    if (image) actor.image = image;
    if (birthday) actor.birthday = new Date(birthday);

    await actor.save();
    res.json(actor);
  } catch (error) {
    console.error("Error updating actor:", error);
    res.status(500).json({ message: "Error updating actor" });
  }
};

/**
 * Delete an actor
 * @route DELETE /actors/:id
 */
export const deleteActor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const actor = await Actor.findByPk(id);

    if (!actor) {
      res.status(404).json({ message: "Actor not found" });
      return;
    }

    await actor.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting actor:", error);
    res.status(500).json({ message: "Error deleting actor" });
  }
};
