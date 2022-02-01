import "dotenv/config";
import "./models/shop";
import { sequelize } from "./config/connection";

sequelize
  .sync({ alter: true })
  .then((res) => console.log(res))
  .catch((err) => console.log(`Error: ${err}`));

// podemos usar el force si necesitamos resetear la base por completo
// sequelize.sync({ force: true }).then((res) => console.log(res));
