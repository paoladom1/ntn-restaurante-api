import mongoose from 'mongoose';

 var Schema = mongoose.Schema;


var schema = new Schema({
    Code:Number,
    Name: String,
    Position: [String],
    
});


module.exports = mongoose.model('Employee',schema);