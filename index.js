const express = require("express");
const db = require("./mongoDB");
const cors = require("cors");
const foodRoute = require("./routes/FoodRoute.js");

const PORT = 9200;
const app = express();
db.connectDB();
app.use(cors());
app.use(express.json());
app.use("/food",foodRoute);
app.listen(PORT,()=>{
    console.log(`Running Kool backend on port ${PORT}`)
});