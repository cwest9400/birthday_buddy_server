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
});

//CREATE BIRTHDAY
router.post('/', async (req, res)=>{
    try {
        const createdBirthday = await Birthdays.create(req.body)
        console.log(createdBirthday)
        return res.status(200).json(createdBirthday)
    } catch(error) {
        res.status(400).json({error:err})
    }
})



/////////////////

module.exports = router;


