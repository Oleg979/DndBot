var TelegramBot = require("node-telegram-bot-api");
var token = "711800064:AAEmRD8V49AOHFItrVaSYFYUJ2Qth48cJTQ";
var bot = new TelegramBot(token, { polling: true });

var rollDice = require("./services/rollService");

bot.onText(/d(.+) (.+)/, function(msg, match) {
  var fromId = msg.chat.id;
  var edges = match[1];
  var times = match[2];
  bot.sendMessage(
    fromId,
    `Результат: ${rollDice(edges, times)
      .map(i => i + " ")
      .join("")}`
  );
});

bot.onText(/карта/, function(msg, match) {
  var fromId = msg.chat.id;

  bot.sendPhoto(fromId, "http://i040.radikal.ru/0803/93/b42fd7ee822c.jpg");
});

module.exports = bot;
