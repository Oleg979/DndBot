import { token, socksHost, socksPort, useProxy } from "./config/tg.config";
import TelegramBot from "node-telegram-bot-api";
import Game from "./models/game.model";
import rollDice from "./services/roll.service";
import Agent from "socks5-https-client/lib/Agent";

const bot = new TelegramBot(token, {
  polling: true,
  request: useProxy
    ? {
        agentClass: Agent,
        agentOptions: {
          socksHost,
          socksPort
        }
      }
    : {}
});

bot.onText(/d(.+) (.+)/, (msg, match) => {
  const fromId = msg.chat.id;
  const edges = match[1];
  const times = match[2];
  bot.sendMessage(
    fromId,
    `Результат: ${rollDice(edges, times)
      .map(i => i + " ")
      .join("")}`
  );
});

bot.onText(/(к|К)арт(а|у|е|ой)/, async (msg, match) => {
  const fromId = msg.chat.id;
  let game = await Game.findOne({ where: { chatId: fromId } });
  const map = game.map;
  bot.sendPhoto(fromId, map);
});

bot.onText(/(с|С)оздать кампанию (.+)/, async (msg, match) => {
  const fromId = msg.chat.id;
  let game = await Game.findOne({ where: { chatId: fromId } });
  if (game) {
    bot.sendMessage(
      fromId,
      `В этом чате уже идёт кампания "${game.title}". Сперва завершите её.`
    );
  } else {
    game = await Game.create({
      chatId: fromId,
      title: match[2]
    });
    bot.sendMessage(fromId, `Кампания создана и привязана к чату.`);
  }
});

bot.onText(/(д|Д)обавить карту (.+)/, async (msg, match) => {
  const photoId = msg.photo[0].file_id;
  const fromId = msg.chat.id;
  let game = await Game.findOne({ where: { chatId: fromId } });
  await Game.update(
    { map: photoId || match[2] },
    {
      where: {
        id: game.id
      }
    }
  );
  bot.sendMessage(fromId, `Карта добавлена.`);
});

export default bot;
