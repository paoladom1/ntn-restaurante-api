const mongoose = require('mongoose'),
Schema = mongoose.Schema;


var schema = new Schema({
    name: String,
    correo: String,
    DUI: String,
});


module.exports = mongose.model('cliente',schema);