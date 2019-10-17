var mongoose = require("mongoose");
var ChatSchema = new mongoose.Schema({
  gameId: mongoose.Types.ObjectId,
  chatId: String
});
mongoose.model("Chat", ChatSchema);

module.exports = mongoose.model("Chat");
