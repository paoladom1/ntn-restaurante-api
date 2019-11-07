import mongoose from 'mongoose';
 var Schema = mongoose.Schema;


var schema = new Schema({
    Code: Number,
    Name: String,
    Direction: String,
    Location:[String],
    Menu:[String]

});


module.exports = mongoose.model('Restaurant',schema);