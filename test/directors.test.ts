import request from "supertest";
import createApp from "../src/app";
import { Director } from "./testSetup";

const app = createApp();

describe("Director Routes", () => {
  describe("GET /directors", () => {
    it("should return all directors ordered by last name and first name", async () => {
      await Director.create({
        first_name: "Steven",
        last_name: "Spielberg",
        nationality: "American",
        image: "https://example.com/spielberg.jpg",
        birthday: new Date("1946-12-18"),
      });

      await Director.create({
        first_name: "Christopher",
        last_name: "Nolan",
        nationality: "British",
        image: "https://example.com/nolan.jpg",
        birthday: new Date("1970-07-30"),
      });

      const response = await request(app).get("/directors");

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].firstName).toBe("Christopher");
      expect(response.body[1].firstName).toBe("Steven");
    });
  });

  describe("POST /directors", () => {
    it("should create a new director", async () => {
      const newDirector = {
        firstName: "Quentin",
        lastName: "Tarantino",
        nationality: "American",
        image: "https://example.com/tarantino.jpg",
        birthday: "1963-03-27",
      };

      const response = await request(app).post("/directors").send(newDirector);

      expect(response.status).toBe(201);
      expect(response.body.first_name).toBe("Quentin");
      expect(response.body.last_name).toBe("Tarantino");
      expect(response.body.id).toBeDefined();
    });
  });

  describe("DELETE /directors/:id", () => {
    it("should delete an existing director", async () => {
      const director = await Director.create({
        first_name: "Martin",
        last_name: "Scorsese",
        nationality: "American",
        image: "https://example.com/scorsese.jpg",
        birthday: new Date("1942-11-17"),
      });

      const response = await request(app).delete(`/directors/${director.id}`);

      expect(response.status).toBe(204);

      const deletedDirector = await Director.findByPk(director.id);
      expect(deletedDirector).toBeNull();
    });
  });

  describe("PUT /directors/:id", () => {
    it("should update an existing director", async () => {
      const director = await Director.create({
        first_name: "James",
        last_name: "Cameron",
        nationality: "Canadian",
        image: "https://example.com/cameron.jpg",
        birthday: new Date("1954-08-16"),
      });

      const updates = {
        firstName: "Jim",
        nationality: "Canada",
      };

      const response = await request(app)
        .put(`/directors/${director.id}`)
        .send(updates);

      expect(response.status).toBe(200);
      expect(response.body.first_name).toBe("Jim");
      expect(response.body.nationality).toBe("Canada");
    });
  });
});
