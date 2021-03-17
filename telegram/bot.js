const { YOUR_TOKEN } = process.env;
const { Telegraf } = require('telegraf');
const keyboards = require('./keyboards');
const session = require('telegraf/session.js');
const utils = require('./utils');


function createBot() {
  let bot = new Telegraf(YOUR_TOKEN);

  bot.use(session())
  bot.start((ctx) => {
    ctx.replyWithHTML(
      'Привет! Я <b>Kam-school bot</b>\n\n'+
      'Я могу немного рассказать о своем создателе или записать твои данные\n'+
      'Что выберешь?🙃',
      keyboards.getMainMenu()
      );
  })
  bot.help((ctx) => ctx.replyWithHTML(
    'Если хочешь начать заново - <b>/start</b> твой выбор🙂\n'+
    'Хочешь узнать о создателе школы жду от тебя <b>"Узнать о создателе"</b>\n'+
    'Желаешь оставить свои контактные данные? Команда <b>"Оставить данные"</b> специально для этого\n'+
    'Интересно кто смастерил меня? <b>/author</b> поможет тебе в этом.'
  ))
  bot.command('author', (ctx) => {
    ctx.replyWithHTML(
      'Привет, рад что ты заинтересовался!🥳\n'+
      'Меня зовут <b>Космачев Илья</b> и на момент создания бота я Front-end разработчик.\n'+
      'Вот тут можно ознакомиться с моими работами: https://github.com/Ginger-Raccoon \n'+
      'А если вдруг у тебя остались вопросы или просто хочешь пообщаться стучись в тг @gingerracoon, я не кусаюсь😜',
      keyboards.toBegining()
    )
  })
  bot.command('bro', (ctx) => {
    ctx.replyWithSticker('CAACAgIAAxkBAAEB8NJgPfjku-G-zj6wQ5xgBxpuBVdchwAC8wQAAlSlcghlUM5huKL-zh4E')
  })
  bot.command('twitter', (ctx) => {
    ctx.replyWithSticker('CAACAgIAAxkBAAEB8NRgPf-MDgtSyrLyBspaksVZpcdlQQACIwEAAlSlcgiuWJW3tYcY3R4E')
  })
  bot.hears('Обо мне', ctx => {
    ctx.replyWithPhoto(
      'http://kam-school.ru/images/i49.jpg',
      {
        caption: 'Я Камиль. Мне 23 года. Как и большинство школьников, я поступил в университет, чтобы получить высшее образование. Но нужных знаний не получил и решил действовать сам! Я уехал в Москву с нулём в кармане. Мне удалось поработать в крупнейших российских и международных компаниях таких как Europlan, Красное и Белое, sberTech, sberBank. Сейчас я точно знаю в какой сфере можно развиваться и зарабатывать. Программировать может любой! И я помогу тебе добиться успеха!',
        reply_markup: {
          keyboard: [
            [{ text: 'Хочу поступить'},
            { text: 'Узнать еще больше!'}]
          ],
          resize_keyboard: true,
          one_time_keyboard: true
        },
      },
    );
  })
  bot.hears('Хочу поступить', ctx => {
    ctx.replyWithHTML(
      'Отлично!\n'+
      'Сообщи мне твои <b>Имя</b>, <b>Email</b> и <b>Телефон</b>\n'+
      '<i><b>Пример:</b></i>\n Василий testmail@test.ru +79993337722\n'+
      'Или:',
      keyboards.toBeginingInline(),
    )
  })
  bot.hears('Узнать еще больше!', ctx => {
    ctx.replyWithHTML(
      'Супер! Держи видео:\n'+
      'https://youtu.be/euFnk6ajZoE\n'+
      'Или заходи на наш сайт: kam-school.ru',
      keyboards.toBegining()
    )
  })
  bot.hears('В начало', (ctx) => {
    ctx.replyWithHTML(
      'Привет! Я <b>Kam-school bot</b>\n\n'+
      'Я могу немного рассказать о своем создателе или записать твои данные\n'+
      'Что выберешь?🙃',
      keyboards.getMainMenu(),
    );
  })
  bot.on('text', ctx => {
    if (ctx.message.text !='Оставить данные' || ctx.message.text !='Узнать о создателе' || ctx.message.text != 'В начало' ) {
      ctx.session.dataString = ctx.message.text
      ctx.replyWithHTML(
        'Поддтвердите правильность введенных данных\n'+
        `<i>${ctx.message.text}</i>`,
        keyboards.yesNoKeyboard()
        )
    }
  })
  bot.action(['repeat'], async(ctx) => {
    await ctx.replyWithHTML(
      '<i><b>Пример:</b></i>\n Василий testmail@test.ru +79993337722'
    )
  })
  bot.action(['start'], async(ctx) => {
    await ctx.replyWithHTML(
      'Привет! Я <b>Kam-school bot</b>\n\n'+
      'Я могу немного рассказать о своем создателе или записать твои данные\n'+
      'Что выберешь?🙃',
      keyboards.getMainMenu()
    );
  })
  bot.action(['yes'], async(ctx) => {
    if (typeof ctx.session.dataString != 'undefined') {
      let chatId = ctx.chat.id
      await utils.handlerData(ctx.session.dataString, chatId);
    } else {
      await ctx.replyWithHTML(
        'Что то пошло не так😱\n'+
        'Пожалуйста, повтори ввод данных или:',
        keyboards.toBegining()
      )
    }
  })

    bot.launch()
  }

  module.exports = createBot();