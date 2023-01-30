const express = require('express');
const router = express.Router();

// MODEL
const { Birthdays } = require('../models');

router.use(express.json());

//////ROUTES//////

//ALL BIRTHDAYS
router.get('/', async (req, res) => {
    try {
        const allBirthdays = await Birthdays.find({})
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

//UPDATE BIRTHDAY
router.put('/:id', async (req, res)=>{
    try {
        const updateBirthday = await Birthdays.findByIdAndUpdate(req.params.id, req.body, {new: true})
        console.log(updateBirthday)
        return res.status(200).json(updateBirthday)

    } catch(error) {
        res.status(400).json({error:err})
    }
})

//DELETE BIRTHDAY




/////////////////

module.exports = router;


