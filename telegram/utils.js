const { botData } = require('../controllers/user');

let handlerData = function(str, id) {
    // console.log(str.split(' '));
    arr = str.split(' ');
    let obj = {}
    obj.name = arr[0];
    obj.email = arr[1];
    obj.telephone = arr[2];
    botData(obj, id)
}

module.exports = {
  handlerData: handlerData
}