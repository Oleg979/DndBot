var mongoose = require("mongoose");
var GameSchema = new mongoose.Schema({
  title: String,
  map: {
    type: String,
    default: ""
  }
});
mongoose.model("Game", GameSchema);

module.exports = mongoose.model("Game");
