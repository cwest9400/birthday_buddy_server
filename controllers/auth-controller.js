const express = require('express');
const router = express.Router();
const bodyParser =require("body-parser")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { User } = require('../models');


router.use(express.json());



//creating an account
router.post("/register", async (req, res) => {
    const user = req.body
    
    const takenEmail = await User.findOne({email: user.email})
    if (takenEmail) {
        res.json({message: "There is already an account registered with that Email."})
    } else {
        user.password = await bcrypt.hash(req.body.password, 10)

        const dbUser = new User( {
            firstName: user.firstName.toLowerCase(),
            lastName: user.lastName.toLowerCase(),
            email: user.email.toLowerCase(),
            password: user.password
        })
        dbUser.save()
        res.json({message: "Success"})
    }
})