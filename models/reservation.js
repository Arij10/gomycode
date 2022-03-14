const mongoose = require('mongoose');


const reservationSchema = new mongoose.Schema({
    name:{type:String, required:true},
    personne:{type:String, required:true},
    date:{type:Date, required:true}
})
module.exports = mongoose.model('Reservation',reservationSchema) 