const {google} = require ('googleapis');
const keys = require('./credentials.json');
const config = require('./config');


const client = new google.auth.JWT(keys.client_email, null, keys.private_key, ['https://www.googleapis.com/auth/spreadsheets']);

client.authorize(function(error,tokens){
  if(error){console.log(error);return;}
  else
  {console.log('Connected Google Sheets Api!')}
  });

  // Получить номер последней строки в таблице
async function getLastRow(cl){
  const gsapi=google.sheets({version:'v4', auth:cl });
    const opt = {
        spreadsheetId: config.spreadid,
        range: 'Data!A1:A'
    }
    let response = await gsapi.spreadsheets.values.get(opt);
    return response.data.values.length;
}
// Записать в последнюю строку таблицы данные.
async function updateSheet(name, email, telephone, date, source) {
    let lastRow = await getLastRow(client) + 1;
    const cl = client;
    const gsapi=google.sheets({version:'v4', auth:cl });
    const opt = {
            spreadsheetId : config.spreadid,
            range: 'Data!A' + lastRow,
            valueInputOption:'USER_ENTERED',
            resource: {values: [[name, telephone, email, date, source]]}
    }
    await gsapi.spreadsheets.values.update(opt);
}

module.exports.updateSheet = updateSheet;

