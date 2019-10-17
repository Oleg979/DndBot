var mongoose = require("mongoose");
var GameSchema = new mongoose.Schema({
  title: String
});
mongoose.model("Game", GameSchema);

module.exports = mongoose.model("Game");
