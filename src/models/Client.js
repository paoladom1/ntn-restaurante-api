import mongoose from 'mongoose';
Schema = mongoose.Schema;


var schema = new Schema({
    Name: String,
    Email: String,
    DUI: String,
});


module.exports = mongose.models('Client',schema);