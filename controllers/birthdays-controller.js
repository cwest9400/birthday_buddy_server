
const express = require('express');
const router = express.Router();


// MODEL
const { Birthday, User } = require('../models');

router.use(express.json());
const {verifyJWT} = require('../middleware')
console.log(verifyJWT , "testing")
//////ROUTES//////

//ALL BIRTHDAY
router.get('/',verifyJWT, async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.id).populate("birthdays")
        console.log(currentUser)
        res.status(200).json(currentUser.birthdays)
    } catch (error){
        res.status(400).json({error:error.message})
    }
});

//BIRTHDAY DETAIL
router.get('/:id', async (req,res)=> {
    try {
        const foundBirthday = await Birthday.findById(req.params.id)
        res.status(200).json(foundBirthday)
    }catch (error) {
        res.status(400).json({error: error})
    }
})

//CREATE BIRTHDAY
router.post('/', verifyJWT, async (req, res)=>{
    try {
        console.log(req.user)
        console.log(req.body)

        const createdBirthday = await Birthday.create(req.body)
        const currentUser = await User.findById(req.user.id)
        currentUser.birthdays.push(createdBirthday._id)
        await currentUser.save()
        console.log(createdBirthday)
        console.log(currentUser)
        return res.status(200).json(createdBirthday)
    } catch(error) {
        console.log(error)
       
        res.status(400).json({error:error})
    }
})

//UPDATE BIRTHDAY
router.put('/:id', async (req, res)=>{
    try {
        const updateBirthday = await Birthday.findByIdAndUpdate(req.params.id, req.body, {new: true})
        console.log(updateBirthday)
        return res.status(200).json(updateBirthday)

    } catch(error) {
        res.status(400).json({error:error})
    }
})

//DELETE BIRTHDAY
router.delete('/:id', async ( req,res)=> {
    try {
        const deleteBirthday = await Birthday.findByIdAndDelete(req.params.id)
        console.log(deletebirthday)
        return res.status(200).json(deleteBirthday)
    } catch(error) {
        res.status(400).json({error:error})
    }
})



/////////////////

module.exports = router;


