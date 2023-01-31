const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser =require("body-parser")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("./models/User")

const app = express();

//body parser middleware
const urlencodedParser = bodyParser.urlencoded({ extended: false})
app.use(bodyParser.json(), urlencodedParser)

//require controllers//
const birthdaysController = require('./controllers/birthdays-controller')
//////////////

require('dotenv').config();
require('./config/db.connection')

const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//app.us(/'?', ?Controller) controller
app.use('/birthdays', birthdaysController)


//////////////

//home redirect
app.get('/', (req,res)=>res.redirect('/birthdays'))

app.listen(PORT, ()=> {
    console.log(`listening on: ${PORT}`)
})

