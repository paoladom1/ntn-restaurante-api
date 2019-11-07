import mongoose from 'mongoose';
Schema = mongoose.Schema;


var schema = new Schema({
    Code: Number,
    Name: String,
    Direction: String,
    Location:[String],
    Menu:[String]

});


module.exports = mongoose.models('Restaurant',schema);