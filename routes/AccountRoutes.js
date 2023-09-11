const router = require('express').Router();
const bcrypt = require('bcryptjs')
const AccountDetailsModel = require('../models/Account');
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken');

router.post('/insertAccount',async(req,res)=>{
    const {firstName,lastName,contact,address,age,email,password} = req.body
    try {
        const userExist = await AccountDetailsModel.findOne({email});

        if(!userExist){
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password,salt)
            const userRoles = 2
           const user = await AccountDetailsModel.create({
               firstName,
               lastName,
               contact,
               address,
               age,
               email,
               password:hashPassword,
               userRoles:userRoles
           })
           if(user){
               res.status(201).json('New Account Added ! - server')
           }
           else{
               res.status(500).json('Invalid Data')
           }
        }
        else{
            res.status(400).json('User Already Exist');
        }
         
    } catch (error) {
        res.status(500).json('Failed to add Account ! - server')
    }
})
router.post('/loginAuth',async(req,res)=>{
    const {email,password} = req.body

    const user = await AccountDetailsModel.findOne({email})
    try {
        if(user && (await bcrypt.compare(password,user.password))){
            const token = generateToken(user._id)

            res.json({
                _id: user.id,
                firstName: user.firstName,
                email:user.email,
                contact:user.contact,
                userRoles:user.userRoles,
                token: token  
            })
        }
        else{
            res.json("Username or Password Incorrect")
        }
    } catch (error) {
        res.status(400).json(error)
    }
   
})

//generate token
const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',

    })
}
module.exports = router