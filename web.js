import express from "express";
import bodyParser from "body-parser";
import { name, description, version, author } from "./package.json";
import db from "./src/helpers/db.starter";

db.sync({ force: false })
  .then(() => {
    console.log("Tables have been created");
  })
  .catch(err => console.log(err));

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ name, description, version, author });
});

const server = app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Web server started at http://${host}:${port}`);
});

export default bot => {
  app.post("/" + bot.token, (req, res) => {
    console.log(req);
    bot.processUpdate(req.body);
    res.sendStatus(200);
  });
};
