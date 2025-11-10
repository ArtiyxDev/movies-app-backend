import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

/**
 * Actor attributes interface
 */
interface ActorAttributes {
  id: number;
  first_name: string;
  last_name: string;
  nationality: string;
  image: string;
  birthday: Date;
}

/**
 * Optional fields when creating a new actor
 */
interface ActorCreationAttributes extends Optional<ActorAttributes, "id"> {}

/**
 * Actor Model
 * Represents actors in the database
 */
class Actor
  extends Model<ActorAttributes, ActorCreationAttributes>
  implements ActorAttributes
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

Actor.init(
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
    tableName: "actors",
    timestamps: true,
  }
);

export default Actor;
