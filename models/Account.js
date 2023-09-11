const mongoose = require('mongoose')

const AccountDetailsSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    contact:String,
    address:String,
    age:Number,
    email:String,
    password:String,
    userRoles:Number

})
const AccountDetailsModel = mongoose.model('Accounts',AccountDetailsSchema,'Accounts')
module.exports = AccountDetailsModel;