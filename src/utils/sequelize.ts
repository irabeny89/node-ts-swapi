import { Sequelize } from "sequelize"
// sqlite local database instance
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./src/models/database.sqlite3"
})

export default sequelize