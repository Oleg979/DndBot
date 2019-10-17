var TelegramBot = require("node-telegram-bot-api");
var token = "711800064:AAEmRD8V49AOHFItrVaSYFYUJ2Qth48cJTQ";
var bot = new TelegramBot(token, { polling: true });
var Chat = require("./models/Chat");
var Game = require("./models/Game");
var rollDice = require("./services/rollService");

bot.onText(/d(.+) (.+)/, (msg, match) => {
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

bot.onText(/карт(а|у|е|ой)/, async (msg, match) => {
  var fromId = msg.chat.id;
  var chat = await Chat.findById(fromId);
  var gameId = chat.gameId;
  var game = await Game.findById(gameId);
  var map = game.map;
  bot.sendPhoto(fromId, map);
});

bot.onText(/создать кампанию (.+)/, async (msg, match) => {
  var fromId = msg.chat.id;
  var chat = await Chat.findOne({ chatId: fromId });
  if (!chat) {
    var game = await Game.create({
      title: match[1]
    });
    await Chat.create({
      chatId: fromId,
      gameId: game._id
    });
    bot.sendMessage(fromId, `Кампания создана и привязана к чату.`);
  } else {
    if (chat.gameId != 0) {
      var game = await Game.findById(chat.gameId);
      bot.sendMessage(
        fromId,
        `В этом чате уже идёт кампания "${game.title}". Сперва завершите её.`
      );
    } else {
      var game = await Game.create({
        title: match[1]
      });
      chat.gameId = game._id;
      await chat.save();
      bot.sendMessage(fromId, `Кампания создана и привязана к чату.`);
    }
  }
});

bot.onText(/добавить карту (.+)/, async (msg, match) => {
  var fromId = msg.chat.id;
  var chat = await Chat.findOne({ chatId: fromId });
  chat.map = match[1];
  await chat.save();
  bot.sendMessage(fromId, `Карта добавлена.`);
});

module.exports = bot;
