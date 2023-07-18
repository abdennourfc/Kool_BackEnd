const express = require("express");
const router = express.Router();
const FoodController = require("../controllers/FoodController");

router.get("/getAll",FoodController.getAllFood);
router.get("/search",FoodController.getFood);
router.post("/add",FoodController.addFood);
router.put("/update",FoodController.updateFood);
router.delete("/delete",FoodController.deleteFood);


module.exports = router;