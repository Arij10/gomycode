const express = require('express'); 
require('dotenv').config()
const connectDb = require('./config/connectDb')
const cors = require('cors');
const app = express();
const authRoute = require('./routes/auth');
const userSchema = require('./models/contact.model')
const bcrypt = require('bcrypt');
connectDb()
const port = /*process.env.PORT ||*/ 4000;
app.use(express.json());
app.use(cors());

app.use('/api',authRoute);

init()

async function init() {
    try {
        const isAdmin = await userSchema.findOne({email: 'admin@admin.com'});
    if(!isAdmin) {
        const admin = new userSchema({
            name: 'admin',
            email: 'admin@admin.com',
            password: bcrypt.hashSync('123456789',10),
            role: 'admin'
        })
        await admin.save();
        console.log('admin added')
    } 
    } catch (error) { 
        console.log(error)
    }  
    
}

app.listen(port,(err)=>{
    err ? consolelog(err) 
    : 
    console.log(`our server is listening on ${port}`);
})

 