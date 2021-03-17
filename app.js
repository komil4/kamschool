require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const limiter = require('./middlewares/rateLimit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');

const createBot = require('./telegram/bot');
createBot

const corsOptions = {
  origin: [
    'http://localhost:8080',
    'http://84.201.152.81:3000',
    'http://kam-school.ru',
    'https://kam-school.ru',
  ],

  optionsSuccessStatus: 200,
  credentials: true,
};

const { NODE_ENV, BASE_URL } = process.env;

mongoose.connect(NODE_ENV === 'production' ? BASE_URL : 'mongodb://localhost:27017/kamschool', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const { PORT = 3000 } = process.env;

const app = express();

app.use(cookieParser());
app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('*', cors(corsOptions));
app.use(router);

app.use(errorLogger);

app.use(errors());

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
app.use(requestLogger);
