const EditDate = require('../utils/utils');
const User = require('../models/user');
//Telegram
const { YOUR_TOKEN } = process.env;
const { Telegraf } = require('telegraf')
const bot = new Telegraf(YOUR_TOKEN);
// const createBot = require('../telegram/bot');
// createBot();
const chatId = '-530346437'
const opt = {
  parse_mode: 'HTML'
}
//google API
const config = require('../googleSheets/config');
const Googleapi = require('../googleSheets/googleapi');

module.exports.userData = (req, res, next) => {
  let date = new Date();
  let editDate = EditDate.editDataFormat(date.toJSON().slice(0, 10));
  const { name, email, telephone, status } = req.body;
  req.body.date = editDate;
  const source = 'Сайт'
  req.body.source = source
  User.create({ name, email, telephone, date, source, status })
  .then((data) => {
    let msg = `Новый клиент!\n  <b>Имя:</b> ${data.name}\n  <b>E-mail:</b> ${data.email}\n  <b>Тел.:</b> ${data.telephone}\n <b>Дата:</b> ${editDate}\n <b>Источник:</b> ${data.source}\n <b>Статус:</b> ${data.status}`
    return bot.telegram.sendMessage(chatId, msg, opt)
      .then(() =>{
        Googleapi.updateSheet(data.name, data.email, data.telephone, editDate, data.source, data.status)
          .then(() => {res.send({ message: 'Данные успешно сохранены' })})
          .catch((err) => {res.status(400).send(err)})
      })
      .catch((err) => { console.log(err)
        res.send({ message: 'Проблема с ботом'})});
  })
  .catch((err) => {
    if (err._message === 'user validation failed') {
      res.status(400).send({ message: 'Введены неверные данные'});
    }
    next(err)
  })
}

module.exports.botData = (req, id) => {
  let date = new Date();
  let editDate = EditDate.editDataFormat(date.toJSON().slice(0, 10));
  const { name, email, telephone } = req
  req.date = editDate;
  const source = 'Бот';
  req.source = source;
  User.create({ name, email, telephone, date, source })
  .then((data) => {
    let msg = `Новый клиент!\n  <b>Имя:</b> ${data.name}\n  <b>E-mail:</b> ${data.email}\n  <b>Тел.:</b> ${data.telephone}\n <b>Дата:</b> ${editDate}\n <b>Источник:</b> ${data.source}`
    return bot.telegram.sendMessage(chatId, msg, opt)
      .then(() =>{
        Googleapi.updateSheet(data.name, data.email, data.telephone, editDate, data.source)
          .then(() => {
            let msg = 'Данные успешно сохранены'
            return bot.telegram.sendMessage(id, msg, opt)
          })
          .catch((err) => {
            let msg = 'Произошла какая-то ошибка, попробуйте позже'
            return bot.telegram.sendMessage(id, msg, opt)
          })
      })
      .catch((err) => {
        let msg = 'Произошла какая-то ошибка, попробуйте позже'
        return bot.telegram.sendMessage(id, msg, opt)
      });
  })
  .catch((err) => {
    if (err._message === 'user validation failed') {
      let msg = 'Введены не корректные данные, устраните ошибку и попробуйте снова';
      return bot.telegram.sendMessage(id, msg, opt)
    }
  })
}

