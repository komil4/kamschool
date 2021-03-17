const router = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
const { userData } = require('../controllers/user');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const NotFoundError = require('../errors/not-found-err');



router.use('/', userData);
router.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

router.use(errorLogger);
router.use(errors());

module.exports = router;




// bot.onText(/\/start/, (msg) => {
//   const chatId = msg.chat.id;
//   const text = 'Привет, я Kam_school бот, давай я расскажу немного о своем создателе или перейдем сразу к записи?'
//   bot.sendMessage(chatId, text);
// })

// bot.onText(/\/info/, (msg) => {
//   const chatId = msg.chat.id;
//   const text = 'Привет, я Камиль. Мне 23 года. Как и большинство школьников, я поступил в университет, чтобы получить высшее образование. Но нужных знаний не получил и решил действовать сам! Я уехал в Москву с нулём в кармане. Мне удалось поработать в крупнейших российских и международных компаниях таких как Europlan, Красное и Белое, sberTech, sberBank. Сейчас я точно знаю в какой сфере можно развиваться и зарабатывать. Программировать может любой! И я помогу тебе добиться успеха!'
//   bot.sendMessage(chatId, text);
// })

// bot.onText(/\/signup/, (msg) => {
//   const opt = {
//     parse_mode: 'HTML'
//   }
//   const chatId = msg.chat.id;
//   const text = 'Отлично! Тогда мне нужны: твое имя, email и номер телефона\n(в формате: +79994443311).\n<b>Большая просьба!</b>\nСоблюдай порядок и формат телефона, иначе магии не случится:)\nУверен ты справишься!💪🏼'
//   bot.sendMessage(chatId, text, opt);
// })

// bot.on('message', (msg) => {
//   if (msg.text == '/start' && msg.text == '/info' && msg.text == '/signup') {
//     const chatId = msg.chat.id;
//     const text = 'К сожалению я лишь бот, так что буду признателен использованию только заложенных команд'
//     bot.sendMessage(chatId, text);
//   }
// });

// bot.onText(new RegExp('\/start'), function (message, match) {
//   // вытаскиваем id клиента из пришедшего сообщения
//   var clientId = message.hasOwnProperty('chat') ? message.chat.id : message.from.id;
//   // посылаем ответное сообщение
//   bot.sendMessage(clientId, 'Привет, я Kam_school бот, давай я расскажу немного о своем создателе или перейдем сразу к записи?', messageOptions);
// });

// bot.on("polling_error", (msg) => console.log(msg));