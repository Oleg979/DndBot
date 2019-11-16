import Sequelize from "Sequelize";
import db from "../helpers/db.starter";

export default db.define("character", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  userId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lvl: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
});
