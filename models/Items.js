const mongoose = require('mongoose');

const getPhilippineTime = () => {
    const currentDate = new Date();
    const timezoneOffset = 8 * 60; // UTC+8 in minutes
    return new Date(currentDate.getTime() + timezoneOffset * 60 * 1000);
  };

const ItemDetailsSchema = new mongoose.Schema({
    imageUrl:String,
    ItemCategory:String,
    ItemColor:String,
    ItemBrand:String,
    Date:{
        type:Date,
        default:getPhilippineTime
    }
})
const ItemDetailsModel = mongoose.model('Items',ItemDetailsSchema,'Items');
module.exports = ItemDetailsModel;