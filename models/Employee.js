import mongoose from 'mongoose';

Schema = mongoose.Schema;


var schema = new Schema({
    Code:Number,
    Name: String,
    Position: [String],
    
});


module.exports = mongose.models('Employee',schema);