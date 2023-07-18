const mongoose = require("mongoose");
const Schema = mongoose.Schema

const foodSchema = new Schema({
    _id : String,
    name : {type : String, unique : true, require : true},
    image : {type : String, require : true},
    price : {type : Number, require : true},
    quantity : {type : Number, require : true},
})
const Food = mongoose.model('Food',foodSchema);

module.exports = {foodSchema, Food};