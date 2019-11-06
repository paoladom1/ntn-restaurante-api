const mongoose = require('mongoose'),
Schema = mongoose.Schema;


var schema = new Schema({
    Codigo: Number,
    Nombre: String,
    Direccion: String,
    Sucursales:[String],
    Menu:[String],

});


module.exports = mongose.model('restaurante',schema);