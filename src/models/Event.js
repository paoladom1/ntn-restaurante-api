import mongoose from 'mongoose';
 var Schema = mongoose.Schema;


var schema = new Schema({
    Name: String,
   Amount_of_people:Number,
    Reservation: {type:Date, default:Date.now},


});


module.exports = mongoose.model('Event',schema);