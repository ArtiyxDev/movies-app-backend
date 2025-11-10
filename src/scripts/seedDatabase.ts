import dotenv from "dotenv";
import sequelize from "../config/database";
import { Movie, Genre, Actor, Director } from "../models";

dotenv.config();

/**
 * Seed script to populate the database with sample data
 * This creates sample genres, actors, directors, and movies for testing
 */
const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seeding...");

    await sequelize.authenticate();
    console.log("✅ Database connection established");

    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    await sequelize.query(
      "TRUNCATE TABLE movie_actors, movie_directors, movie_genres, movies, actors, directors, genres RESTART IDENTITY CASCADE"
    );
    console.log("✅ Database cleared");

    // Create Genres
    console.log("Creating genres...");
    const genres = await Genre.bulkCreate([
      { name: "Action" },
      { name: "Drama" },
      { name: "Sci-Fi" },
      { name: "Thriller" },
      { name: "Crime" },
      { name: "Mystery" },
      { name: "Horror" },
      { name: "Adventure" },
      { name: "Fantasy" },
      { name: "Music" },
      { name: "Comedy" },
      { name: "Animation" },
    ]);
    console.log(`✅ Created ${genres.length} genres`);

    // Create Actors
    console.log("Creating actors...");
    const actors = await Actor.bulkCreate([
      {
        first_name: "Ethan",
        last_name: "Hawke",
        nationality: "American",
        image:
          "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/2LoTr6x0TEM7L5em4kSx1VmGDgG.jpg",
        birthday: new Date("1970-11-06"),
      },
      {
        first_name: "Mason",
        last_name: "Thames",
        nationality: "American",
        image:
          "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/kPVWuKlDR0wkCSvv5iHLkaEQS0L.jpg",
        birthday: new Date("2007-07-10"),
      },
      {
        first_name: "Madeleine",
        last_name: "McGraw",
        nationality: "American",
        image:
          "https://via.placeholder.com/300x450/2a2a2a/ffffff?text=Madeleine+McGraw",
        birthday: new Date("2008-12-22"),
      },
      {
        first_name: "Richard",
        last_name: "Rowden",
        nationality: "British",
        image:
          "https://via.placeholder.com/300x450/2a2a2a/ffffff?text=Richard+Rowden",
        birthday: new Date("1970-01-01"),
      },
      {
        first_name: "Sean",
        last_name: "Cronin",
        nationality: "Irish",
        image:
          "https://via.placeholder.com/300x450/2a2a2a/ffffff?text=Sean+Cronin",
        birthday: new Date("1976-01-01"),
      },
      {
        first_name: "Arden",
        last_name: "Cho",
        nationality: "American",
        image:
          "https://via.placeholder.com/300x450/2a2a2a/ffffff?text=Arden+Cho",
        birthday: new Date("1985-08-16"),
      },
      {
        first_name: "Ken",
        last_name: "Jeong",
        nationality: "American",
        image:
          "https://via.placeholder.com/300x450/2a2a2a/ffffff?text=Ken+Jeong",
        birthday: new Date("1969-07-13"),
      },
    ]);
    console.log(`✅ Created ${actors.length} actors`);

    // Create Directors
    console.log("Creating directors...");
    const directors = await Director.bulkCreate([
      {
        first_name: "Scott",
        last_name: "Derrickson",
        nationality: "American",
        image:
          "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/caapCMfXLifC7XveUiY653xWBsZ.jpg",
        birthday: new Date("1966-07-16"),
      },
      {
        first_name: "Lars",
        last_name: "Janssen",
        nationality: "Dutch",
        image:
          "https://via.placeholder.com/300x450/1a1a1a/ffffff?text=Lars+Janssen",
        birthday: new Date("1980-01-01"),
      },
      {
        first_name: "Maggie",
        last_name: "Kang",
        nationality: "American",
        image:
          "https://via.placeholder.com/300x450/1a1a1a/ffffff?text=Maggie+Kang",
        birthday: new Date("1985-01-01"),
      },
      {
        first_name: "Chris",
        last_name: "Appelhans",
        nationality: "American",
        image:
          "https://via.placeholder.com/300x450/1a1a1a/ffffff?text=Chris+Appelhans",
        birthday: new Date("1975-01-01"),
      },
    ]);
    console.log(`✅ Created ${directors.length} directors`);

    // Create Movies
    console.log("Creating movies...");

    // Movie 1: Black Phone 2
    const blackPhone2 = await Movie.create({
      name: "Black Phone 2",
      image:
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/xUWUODKPIilQoFUzjHM6wKJkP3Y.jpg",
      synopsis:
        "Four years after escaping The Grabber, Finney Blake is struggling with his life after captivity. When his sister Gwen begins receiving calls in her dreams from the black phone and seeing disturbing visions of three boys being stalked at a winter camp, the siblings become determined to solve the mystery and confront a killer who has grown more powerful in death and more significant to them than either could imagine.",
      release_year: 2025,
    });

    await (blackPhone2 as any).setGenres([genres[6].id, genres[3].id]); // Horror, Thriller
    await (blackPhone2 as any).setActors([
      actors[0].id,
      actors[1].id,
      actors[2].id,
    ]); // Ethan Hawke, Mason Thames, Madeleine McGraw
    await (blackPhone2 as any).setDirectors([directors[0].id]); // Scott Derrickson

    console.log("✅ Created movie: Black Phone 2");

    // Movie 2: Captain Hook: The Cursed Tides
    const captainHook = await Movie.create({
      name: "Captain Hook: The Cursed Tides",
      image:
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/bcP7FtskwsNp1ikpMQJzDPjofP5.jpg",
      synopsis:
        "In the aftermath of a devastating defeat by his archnemesis Admiral Smee, Captain Hook finds refuge in the coastal town of Eldritch Landing.",
      release_year: 2025,
    });

    await (captainHook as any).setGenres([
      genres[7].id,
      genres[0].id,
      genres[6].id,
    ]); // Adventure, Action, Horror
    await (captainHook as any).setActors([actors[3].id, actors[4].id]); // Richard Rowden, Sean Cronin
    await (captainHook as any).setDirectors([directors[1].id]); // Lars Janssen

    console.log("✅ Created movie: Captain Hook: The Cursed Tides");

    // Movie 3: KPop Demon Hunters
    const kpopDemonHunters = await Movie.create({
      name: "KPop Demon Hunters",
      image:
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/zT7Lhw3BhJbMkRqm9Zlx2YGMsY0.jpg",
      synopsis:
        "When K-pop superstars Rumi, Mira and Zoey aren't selling out stadiums, they're using their secret powers to protect their fans from supernatural threats.",
      release_year: 2025,
    });

    await (kpopDemonHunters as any).setGenres([
      genres[8].id,
      genres[9].id,
      genres[10].id,
      genres[11].id,
    ]); // Fantasy, Music, Comedy, Animation
    await (kpopDemonHunters as any).setActors([actors[5].id, actors[6].id]); // Arden Cho, Ken Jeong
    await (kpopDemonHunters as any).setDirectors([
      directors[2].id,
      directors[3].id,
    ]); // Maggie Kang, Chris Appelhans

    console.log("✅ Created movie: KPop Demon Hunters");

    console.log("🎉 Database seeding completed successfully!");
    console.log(`
    Summary:
    - ${genres.length} genres
    - ${actors.length} actors
    - ${directors.length} directors
    - 3 movies with relationships
    `);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
