// Функция изменения даты
// на вход принимает
// let date = new Date()
// date.toJSON().slice(0, 10)

function editDataFormat(wrongDate) {
  const year = wrongDate.split('-')[0];
  const month = wrongDate.split('-')[1];
  const day = wrongDate.split('-')[2];
  if (day[0] === 0) {
    return day = day.substr(1);
  } else day;
  const monthObj = {
    '01': 'января',
    '02': 'февраля',
    '03': 'марта',
    '04': 'апреля',
    '05': 'мая',
    '06': 'июня',
    '07': 'июля',
    '08': 'августа',
    '09': 'сентября',
    '10': 'октября',
    '11': 'ноября',
    '12': 'декабря'
  };
  const monthWord = monthObj[`${month}`];
  return (`${day} ${monthWord} ${year}`);
}


module.exports = {editDataFormat};
