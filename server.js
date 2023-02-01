const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

//auth stuff
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("./models/User")
///////
const app = express();

//body parser middleware
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json(), urlencodedParser)

//require controllers//
const birthdaysController = require('./controllers/birthdays-controller')
const authController = require('./controllers/auth-controller')
//////////////

require('dotenv').config();
require('./config/db.connection')

const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//app.us(/'?', ?Controller) controller
app.use('/birthdays', birthdaysController)
// app.use('/register', authController)


//////////////

//home redirect
app.get('/', (req, res) => res.redirect('/birthdays'))


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
        dbUser.save()
        res.json({ message: "Success" })
    }
})

//LOGIN
app.post("/login", (req, res) => {
    const userLoggingIn = req.body;

    User.findOne({ email: userLoggingIn.email })
        .then(dbUser => {
            if (!dbUser) {
                return res.json({
                    message: "Wrong Email or Password"
                })
            }
            bcrypt.compare(userLoggingIn.password, dbUser.password)
                .then(isCorrect => {
                    if (isCorrect) {
                        const payload = {
                            id: dbUser._id,
                            email: dbUser.email,
                        }
                        jwt.sign(
                            payload,
                            process.env.JWT_SECRET,
                            { expiresIn: 86400 },
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

/////////////////////////////////////////////
//AUTH MIDDLEWARE
////////////////////////////////////////////
function verifyJWT(req, res, next) {
    const token = req.headers["x-access-token"]?.split(' ')[1]

    if (token) {
        jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded) => {
            if (err) return res.json({
                isLoggedIn: false,
                message: "Failed to Authenticate"
            })
            req.user = {};
            req.user.id = decoded.id
            req.user.email = decoded.email
            next()
        })
    } else {
        res.json({ message: "Incorrect Token Given", isLoggedIn: false})
    }
}





////////////////////////////////////////////
app.listen(PORT, () => {
        console.log(`listening on: ${PORT}`)
    })

