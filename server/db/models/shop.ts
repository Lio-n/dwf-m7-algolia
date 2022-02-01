import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/connection";

export class Shop extends Model {}

Shop.init(
  {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    address: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
  },
  {
    sequelize,
    modelName: "Shop",
  }
);
