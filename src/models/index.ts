import Movie from "./Movie";
import Genre from "./Genre";
import Actor from "./Actor";
import Director from "./Director";

/**
 * Database Models Associations
 * Defines many-to-many relationships between movies and genres, actors, directors
 */

// Movie - Genre relationship (many-to-many)
Movie.belongsToMany(Genre, {
  through: "movie_genres",
  foreignKey: "movie_id",
  otherKey: "genre_id",
  as: "genres",
});

Genre.belongsToMany(Movie, {
  through: "movie_genres",
  foreignKey: "genre_id",
  otherKey: "movie_id",
  as: "movies",
});

// Movie - Actor relationship (many-to-many)
Movie.belongsToMany(Actor, {
  through: "movie_actors",
  foreignKey: "movie_id",
  otherKey: "actor_id",
  as: "actors",
});

Actor.belongsToMany(Movie, {
  through: "movie_actors",
  foreignKey: "actor_id",
  otherKey: "movie_id",
  as: "movies",
});

// Movie - Director relationship (many-to-many)
Movie.belongsToMany(Director, {
  through: "movie_directors",
  foreignKey: "movie_id",
  otherKey: "director_id",
  as: "directors",
});

Director.belongsToMany(Movie, {
  through: "movie_directors",
  foreignKey: "director_id",
  otherKey: "movie_id",
  as: "movies",
});

export { Movie, Genre, Actor, Director };
