const express = require("express");
const bodyParser = require("body-parser");
const packageInfo = require("./package.json");

const app = express();
app.use(bodyParser.json());

var mongoose = require("mongoose");
mongoose
  .connect("mongodb://admin:123456A@ds137008.mlab.com:37008/dnd", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to db"));

app.get("/", function(req, res) {
  res.json({ version: packageInfo.version });
});

var server = app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log("Web server started at http://%s:%s", host, port);
});

module.exports = bot => {
  app.post("/" + bot.token, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
  });
};
