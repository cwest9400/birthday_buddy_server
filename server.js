const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

//auth stuff
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
//
const User = require("./models")
const {verifyJWT} = require("./middleware")
///////
const app = express();

//body parser middleware
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json(), urlencodedParser)

//require controllers//
const birthdaysController = require('./controllers/birthdays-controller')
// const authController = require('./controllers/auth-controller')
//////////////

require('dotenv').config();
require('./config/db.connection')

const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))


app.use('/birthdays', birthdaysController)

//home redirect
// app.get('/', (req, res) => res.redirect('/birthdays'))


///auth route///
//creating an account
app.post("/register", async (req, res) => {
    const user = req.body

    const takenEmail = await User.findOne({ email: user.email })
    if (takenEmail) {
        res.json({ message: "There is already an account registered with that Email." })
    } else {
        user.password = await bcrypt.hash(req.body.password, 10)

        const dbUser = new User({
            firstName: user.firstName.toLowerCase(),
            lastName: user.lastName.toLowerCase(),
            email: user.email.toLowerCase(),
            password: user.password
        })
        const savedUser = await dbUser.save()
        const payload = {
            id: savedUser._id,
            email: savedUser.email,
        }
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "24h" },
            (err, token) => {
                if (err) return res.json({ message: err })
                return res.json({
                    message: "Success",
                    token: "Bearer " + token
                })
            }
        )
    }
})

//LOGIN
app.post("/login", (req, res) => {
    const userLoggingIn = req.body;

    User.findOne({ email: userLoggingIn.email })
        .then(user => {
            if (!user) {
                return res.json({
                    message: "Wrong Email or Password"
                })
            }
            bcrypt.compare(userLoggingIn.password, user.password)
                .then(isCorrect => {
                    if (isCorrect) {
                        const payload = {
                            id: user._id,
                            email: user.email,
                        }
                        jwt.sign(
                            payload,
                            process.env.JWT_SECRET,
                            { expiresIn: "24h" },
                            (err, token) => {
                                if (err) return res.json({ message: err })
                                return res.json({
                                    message: "Success",
                                    token: "Bearer " + token
                                })
                            }
                        )
                    } else {
                        return res.json({
                            message: "Wrong Email or Password"
                        })
                    }
                })
        })
})



app.get("/isUserAuth", verifyJWT, (req, res) => {
    console.log(req.user)
    return res.json({isLoggedIn: true, email: req.user.email})
    
})

////access current user
app.get("/getusername", verifyJWT, (req, res) => {
    res.json({isLoggedIn: true, email: req.user.email})
})




////////////////////////////////////////////
app.listen(PORT, () => {
        console.log(`listening on: ${PORT}`)
    })

