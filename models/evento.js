const mongoose = require('mongoose'),
Schema = mongoose.Schema;


var schema = new Schema({
    name: String,
   cantidad_personas:Number,
    Fecha: Date,
    hora:String,

});


module.exports = mongose.model('evento',schema);