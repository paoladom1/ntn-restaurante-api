import mongoose from 'mongoose';
 var Schema = mongoose.Schema;


var schema = new Schema({
    Name: String,
    Email: String,
    DUI: String,
});


module.exports = mongoose.models('Client',schema);