const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();


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
// app.get('/', (req,res)=>res.redirect('/?'))

app.listen(PORT, ()=> {
    console.log(`listening on: ${PORT}`)
})

