import mongoose from 'mongoose';
Schema = mongoose.Schema;


var schema = new Schema({
    Code: Number,
    Name: String,
    Direction: String,
    Branch_offices:[Sucursales],
    Menu:[Menu],

});


module.exports = mongose.models('Restaurant',schema);