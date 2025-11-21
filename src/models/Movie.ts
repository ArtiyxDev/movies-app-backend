import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

/**
 * Movie attributes interface
 */
interface MovieAttributes {
  id: number;
  name: string;
  image: string;
  synopsis: string;
  release_year: number;
}

/**
 * Optional fields when creating a new movie
 */
interface MovieCreationAttributes extends Optional<MovieAttributes, "id"> {}

/**
 * Movie Model
 * Represents movies in the database
 */
class Movie
  extends Model<MovieAttributes, MovieCreationAttributes>
  implements MovieAttributes
{
  declare id: number;
  declare name: string;
  declare image: string;
  declare synopsis: string;
  declare release_year: number;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    release_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "movies",
    timestamps: true,
  }
);

export default Movie;
