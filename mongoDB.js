const mongoose = require("mongoose");
const food = require("./models/Food");
const URI = "mongodb+srv://abdennoursamaali:NcVK3tfLC3SXPmK3@kool.mzvnuc1.mongodb.net/?retryWrites=true&w=majority"

async function connectDB(){
    try{
        await mongoose.connect(URI);
        await food.Food.syncIndexes();
        await console.log("Connected to MongoDB");
    }catch(error){
        console.log(error);
    }
}
module.exports = {
    connectDB
}