var mongoose = require("mongoose");
var ChatSchema = new mongoose.Schema({
  gameId: String,
  chatId: String
});
mongoose.model("Chat", ChatSchema);

module.exports = mongoose.model("Chat");
