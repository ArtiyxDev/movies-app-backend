import request from "supertest";
import createApp from "../src/app";
import { Movie, Genre, Actor, Director } from "./testSetup";

const app = createApp();

describe("Movie Routes", () => {
  describe("GET /movies", () => {
    it("should return all movies ordered by name with their associations", async () => {
      await Movie.create({
        name: "The Matrix",
        image: "https://example.com/matrix.jpg",
        synopsis: "A hacker discovers reality is a simulation",
        release_year: 1999,
      });

      await Movie.create({
        name: "Inception",
        image: "https://example.com/inception.jpg",
        synopsis: "A thief enters dreams to steal secrets",
        release_year: 2010,
      });

      const response = await request(app).get("/movies");

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].name).toBe("Inception");
      expect(response.body[1].name).toBe("The Matrix");
    });
  });

  describe("POST /movies", () => {
    it("should create a new movie", async () => {
      const newMovie = {
        name: "Interstellar",
        image: "https://example.com/interstellar.jpg",
        synopsis: "Astronauts travel through a wormhole",
        release_year: 2014,
      };

      const response = await request(app).post("/movies").send(newMovie);

      expect(response.status).toBe(201);
      expect(response.body.name).toBe("Interstellar");
      expect(response.body.release_year).toBe(2014);
      expect(response.body.id).toBeDefined();
    });
  });

  describe("DELETE /movies/:id", () => {
    it("should delete an existing movie", async () => {
      const movie = await Movie.create({
        name: "Avatar",
        image: "https://example.com/avatar.jpg",
        synopsis: "A marine becomes part of an alien world",
        release_year: 2009,
      });

      const response = await request(app).delete(`/movies/${movie.id}`);

      expect(response.status).toBe(204);

      const deletedMovie = await Movie.findByPk(movie.id);
      expect(deletedMovie).toBeNull();
    });
  });

  describe("PUT /movies/:id", () => {
    it("should update an existing movie", async () => {
      const movie = await Movie.create({
        name: "Titanic",
        image: "https://example.com/titanic.jpg",
        synopsis: "A love story on a doomed ship",
        release_year: 1997,
      });

      const updates = {
        name: "Titanic (1997)",
        release_year: 1997,
      };

      const response = await request(app)
        .put(`/movies/${movie.id}`)
        .send(updates);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Titanic (1997)");
    });
  });

  describe("POST /movies/:id/actors", () => {
    it("should associate actors with a movie", async () => {
      const movie = await Movie.create({
        name: "The Dark Knight",
        image: "https://example.com/darkknight.jpg",
        synopsis: "Batman faces the Joker",
        release_year: 2008,
      });

      const actor1 = await Actor.create({
        first_name: "Christian",
        last_name: "Bale",
        nationality: "British",
        image: "https://example.com/bale.jpg",
        birthday: new Date("1974-01-30"),
      });

      const actor2 = await Actor.create({
        first_name: "Heath",
        last_name: "Ledger",
        nationality: "Australian",
        image: "https://example.com/ledger.jpg",
        birthday: new Date("1979-04-04"),
      });

      const response = await request(app)
        .post(`/movies/${movie.id}/actors`)
        .send([actor1.id, actor2.id]);

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].first_name).toBe("Christian");
      expect(response.body[1].first_name).toBe("Heath");
    });
  });

  describe("POST /movies/:id/directors", () => {
    it("should associate directors with a movie", async () => {
      const movie = await Movie.create({
        name: "Oppenheimer",
        image: "https://example.com/oppenheimer.jpg",
        synopsis: "The story of J. Robert Oppenheimer",
        release_year: 2023,
      });

      const director = await Director.create({
        first_name: "Christopher",
        last_name: "Nolan",
        nationality: "British",
        image: "https://example.com/nolan.jpg",
        birthday: new Date("1970-07-30"),
      });

      const response = await request(app)
        .post(`/movies/${movie.id}/directors`)
        .send([director.id]);

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].first_name).toBe("Christopher");
    });
  });

  describe("POST /movies/:id/genres", () => {
    it("should associate genres with a movie", async () => {
      const movie = await Movie.create({
        name: "The Shawshank Redemption",
        image: "https://example.com/shawshank.jpg",
        synopsis: "Two imprisoned men bond over years",
        release_year: 1994,
      });

      const genre1 = await Genre.create({ name: "Drama" });
      const genre2 = await Genre.create({ name: "Crime" });

      const response = await request(app)
        .post(`/movies/${movie.id}/genres`)
        .send([genre1.id, genre2.id]);

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].name).toBe("Drama");
      expect(response.body[1].name).toBe("Crime");
    });
  });
});
