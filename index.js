var TelegramBot = require("node-telegram-bot-api");
var token = "711800064:AAEmRD8V49AOHFItrVaSYFYUJ2Qth48cJTQ";
var bot = new TelegramBot(token, { polling: true });

bot.onText(/\/echo (.+)/, function(msg, match) {
  var fromId = msg.from.id;
  var resp = match[1];
  bot.sendMessage(fromId, resp + "...");
});
