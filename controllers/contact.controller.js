const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');

const contactsSchema = require('../models/contact.model');
const reservationSchema = require('../models/reservation');

exports.authSignUp =  async (req, res) => {
    const {password,email,name,age,role} =req.body
    try {
        const find = await contactsSchema.findOne({email:email})
        if(find){
        return     res.status(400).send({msg:'user exist'})
        }
        const user = new contactsSchema(req.body)
        const salt = 10; 
        const passwordHashed = bcrypt.hashSync(password, salt);
        const userID ={id:user._id}
        var token = jwt.sign(userID, process.env.SECRET_OR_KEY)
        user.password = passwordHashed;
        await user.save();
    return  res.status(200).send({msg:'registed succefully', token})
    } catch (error) {
    return     res.status(400).send({msg:'error'})
        
    }
}
exports.authSignIn = async (req, res) => {
    const {email, password} = req.body;
    try {
        const find = await contactsSchema.findOne({email: email});
        
        if(!find){
        return     res.status(400).send({msg:'user not exist'})
        }
        
        const match = bcrypt.compareSync (password,find.password)
       
        if(!match){
        return     res.status(400).send({msg:'bad credentials'});
        }
        const userID ={id:find._id}
        let token = jwt.sign(userID, process.env.SECRET_OR_KEY)
    return  res.status(200).send({msg:'loggin succefully',token })

    } catch (error) {
    return     res.status(400).send({msg:'bad credentials',error})
        
    }
}

exports.addReservation =  async (req, res) => {
    const {personne, date} = req.body;
    try {
        const reservation = new reservationSchema(req.body)
        await reservation.save();
        return res.status(200).send({msg:'reservation succefully', reservation })
    } catch (error) {
        return  res.status(500).send({msg:error})
    }
}

exports.getAllReservation =  async (req, res) => {
    const {personne, date} = req.body;
    try {
        const reservationExist = await reservationSchema.find()
        if(!reservationExist) {
        return     res.status(400).send({msg:'reservation doesn\'t exist'})
        }
    return  res.status(200).send({reservations:reservationExist })
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}

exports.deleteReservation =  async (req, res) => {
    const {id} = req.params
    try {
        const reservationExist = await reservationSchema.findByIdAndDelete(id)
        if(!reservationExist) {
            return res.status(400).send({msg:'reservation doesn\'t exist'})
        }
        return res.status(200).send({reservations:reservationExist })
    } catch (error) {
        return  res.status(500).send({msg:error})
    }
}
exports.getMaxMinReservations =  async (req, res) => {
    
    try {
        const reservationExist = await reservationSchema.aggregate([
            {
              $group:
                {
                  _id:null,
                  maxHours: { $max: "$date" },
                  minHours: { $min: "$date" }
                }
            }
          ])
        if(!reservationExist) {
        return     res.status(400).send({msg:'reservation doesn\'t exist'}) 
        }
    return  res.status(200).send({reservations:reservationExist })
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}

exports.updatedReservation =  async (req, res) => {
    const {id} = req.params
    try {
        const reservationExist = await reservationSchema.findByIdAndUpdate(id,{ $set: req.body })
    return  res.status(200).send({reservations:reservationExist })
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}