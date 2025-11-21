import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

/**
 * Genre attributes interface
 */
interface GenreAttributes {
  id: number;
  name: string;
}

/**
 * Optional fields when creating a new genre
 */
interface GenreCreationAttributes extends Optional<GenreAttributes, "id"> {}

/**
 * Genre Model
 * Represents movie genres in the database
 */
class Genre
  extends Model<GenreAttributes, GenreCreationAttributes>
  implements GenreAttributes
{
  declare id: number;
  declare name: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Genre.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "genres",
    timestamps: true,
  }
);

export default Genre;
