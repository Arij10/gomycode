const express = require('express');

const auth = express.Router();
const {authSignUp,authSignIn,addReservation,getAllReservation,getMaxMinReservations,deleteReservation,updatedReservation} = require('../controllers/contact.controller');
const {isValid,validationSignIn,validationSignUp} = require('../middleware/validation');
const {isAuth} = require('../middleware/isAuth');

auth.post('/signup', validationSignUp,isValid , authSignUp)

auth.post('/signin',validationSignIn,isValid ,authSignIn)

auth.post('/reservation',addReservation)

auth.get('/getAllReservation',getAllReservation)

auth.get('/maxMinHours',getMaxMinReservations)

auth.post('/deleteReservation/:id',deleteReservation)

auth.get('/updatedReservation/:id',updatedReservation)
 
auth.get('/current',isAuth,(req, res) => { 
    res.send(req.user)
});
 

module.exports = auth;