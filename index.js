var TelegramBot = require("node-telegram-bot-api");
var token = "711800064:AAEmRD8V49AOHFItrVaSYFYUJ2Qth48cJTQ";
var bot = new TelegramBot(token, { polling: true });

var rollDice = require("./services/rollService");

bot.onText(/\/d(.+) (.+)/, function(msg, match) {
  var fromId = msg.from.id;
  var edges = match[1];
  var times = match[2];
  bot.sendMessage(
    fromId,
    `Результат: ${rollDice(edges, times)
      .map(i => i + " ")
      .join("")}`
  );
});
