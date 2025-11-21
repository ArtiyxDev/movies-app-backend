import request from "supertest";
import createApp from "../src/app";
import { Actor } from "./testSetup";

const app = createApp();

describe("Actor Routes", () => {
  describe("GET /actors", () => {
    it("should return all actors ordered by last name and first name", async () => {
      await Actor.create({
        first_name: "Leonardo",
        last_name: "DiCaprio",
        nationality: "American",
        image: "https://example.com/dicaprio.jpg",
        birthday: new Date("1974-11-11"),
      });

      await Actor.create({
        first_name: "Meryl",
        last_name: "Streep",
        nationality: "American",
        image: "https://example.com/streep.jpg",
        birthday: new Date("1949-06-22"),
      });

      const response = await request(app).get("/actors");

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].firstName).toBe("Leonardo");
      expect(response.body[1].firstName).toBe("Meryl");
    });
  });

  describe("POST /actors", () => {
    it("should create a new actor", async () => {
      const newActor = {
        firstName: "Tom",
        lastName: "Hanks",
        nationality: "American",
        image: "https://example.com/hanks.jpg",
        birthday: "1956-07-09",
      };

      const response = await request(app).post("/actors").send(newActor);

      expect(response.status).toBe(201);
      expect(response.body.first_name).toBe("Tom");
      expect(response.body.last_name).toBe("Hanks");
      expect(response.body.id).toBeDefined();
    });
  });

  describe("DELETE /actors/:id", () => {
    it("should delete an existing actor", async () => {
      const actor = await Actor.create({
        first_name: "Brad",
        last_name: "Pitt",
        nationality: "American",
        image: "https://example.com/pitt.jpg",
        birthday: new Date("1963-12-18"),
      });

      const response = await request(app).delete(`/actors/${actor.id}`);

      expect(response.status).toBe(204);

      const deletedActor = await Actor.findByPk(actor.id);
      expect(deletedActor).toBeNull();
    });
  });

  describe("PUT /actors/:id", () => {
    it("should update an existing actor", async () => {
      const actor = await Actor.create({
        first_name: "Robert",
        last_name: "Downey",
        nationality: "American",
        image: "https://example.com/downey.jpg",
        birthday: new Date("1965-04-04"),
      });

      const updates = {
        firstName: "Robert Jr.",
        nationality: "USA",
      };

      const response = await request(app)
        .put(`/actors/${actor.id}`)
        .send(updates);

      expect(response.status).toBe(200);
      expect(response.body.first_name).toBe("Robert Jr.");
      expect(response.body.nationality).toBe("USA");
    });
  });
});
