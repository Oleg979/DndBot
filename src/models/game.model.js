import Sequelize from "Sequelize";
import db from "../helpers/db.starter";

export default db.define("game", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  chatId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  map: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ""
  }
});
