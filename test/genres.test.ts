import request from "supertest";
import createApp from "../src/app";
import { Genre } from "./testSetup";

const app = createApp();

describe("Genre Routes", () => {
  describe("GET /genres", () => {
    it("should return all genres ordered by name", async () => {
      await Genre.create({ name: "Drama" });
      await Genre.create({ name: "Action" });
      await Genre.create({ name: "Comedy" });

      const response = await request(app).get("/genres");

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(3);
      expect(response.body[0].name).toBe("Action");
      expect(response.body[1].name).toBe("Comedy");
      expect(response.body[2].name).toBe("Drama");
    });
  });

  describe("POST /genres", () => {
    it("should create a new genre", async () => {
      const newGenre = {
        name: "Science Fiction",
      };

      const response = await request(app).post("/genres").send(newGenre);

      expect(response.status).toBe(201);
      expect(response.body.name).toBe("Science Fiction");
      expect(response.body.id).toBeDefined();
    });
  });

  describe("DELETE /genres/:id", () => {
    it("should delete an existing genre", async () => {
      const genre = await Genre.create({ name: "Horror" });

      const response = await request(app).delete(`/genres/${genre.id}`);

      expect(response.status).toBe(204);

      const deletedGenre = await Genre.findByPk(genre.id);
      expect(deletedGenre).toBeNull();
    });
  });

  describe("PUT /genres/:id", () => {
    it("should update an existing genre", async () => {
      const genre = await Genre.create({ name: "Sci-Fi" });

      const updates = {
        name: "Science Fiction",
      };

      const response = await request(app)
        .put(`/genres/${genre.id}`)
        .send(updates);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Science Fiction");
    });
  });
});
