const mongoose = require('mongoose'),
Schema = mongoose.Schema;


var schema = new Schema({
    codigo:Number,
    name: String,
    cargo: [String],
    
});


module.exports = mongose.model('empleado',schema);