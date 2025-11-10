import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

/**
 * Director attributes interface
 */
interface DirectorAttributes {
  id: number;
  first_name: string;
  last_name: string;
  nationality: string;
  image: string;
  birthday: Date;
}

/**
 * Optional fields when creating a new director
 */
interface DirectorCreationAttributes
  extends Optional<DirectorAttributes, "id"> {}

/**
 * Director Model
 * Represents directors in the database
 */
class Director
  extends Model<DirectorAttributes, DirectorCreationAttributes>
  implements DirectorAttributes
{
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public nationality!: string;
  public image!: string;
  public birthday!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Director.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "directors",
    timestamps: true,
  }
);

export default Director;
