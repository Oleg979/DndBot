import Sequelize from "Sequelize";
import { dbname, username, password, dialect } from "../config/db.config";

export default new Sequelize(dbname, username, password, {
  dialect,
  host: "localhost",
  define: {
    timestamps: false
  }
});
