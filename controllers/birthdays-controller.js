const express = require('express');
const router = express.Router();

// MODEL
const { Birthdays } = require('../models');

router.use(express.json());

//////ROUTES//////

//ALL BIRTHDAYS
router.get('/', async (req, res) => {
    try {
        const allBirthdays = Birthdays.find({})
        res.status(200).json(allBirthdays)
    } catch (err){
        res.status(400).json({error:err})
    }
})

//CREATE BIRTHDAY
router.put()



/////////////////

module.exports = router;


