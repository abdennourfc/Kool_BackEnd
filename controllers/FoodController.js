const model = require("../models/Food");
const uuid = require("uuid");
const unauthorizedError = 401;
const notFoundError = 404;
const badRequestError = 400;
const serverError = 500;
const notFoundErrorMessage = { "message": "The food you are looking for, does not exist" }
const serverErrorMessage = { "message": "An error has occured, try again later" }
const badRequestErrorMessage = { "message": "Bad request, verify parameters" }
const unauthorizedErrorMessage = { "message": "Another food item with the same name already exists" }




const getAllFood = (req, res) => {
    model.Food.find()
        .then(data => { res.json({ food: data }) })
        .catch(error => { res.status(serverError).json(serverErrorMessage); console.log(error.message) })
}



const getFood = (req, res) => {
    var search = req.query.food;
    let query = {};
    if (search) {
        query = { name: { $regex: search, $options: 'i' } }
    }
    model.Food.find(query)
        .then(data => { res.json({ food: data }) })
        .catch(error => { res.status(serverError).json(serverErrorMessage); console.log(error.message) })

}



const addFood = (req, res) => {
    if (req.body.hasOwnProperty("food") &&
        req.body.food.hasOwnProperty("name") &&
        req.body.food.hasOwnProperty("price") &&
        req.body.food.hasOwnProperty("quantity") &&
        req.body.food.hasOwnProperty("image")) {

        var food = new model.Food({
            _id: uuid.v1(),
            name: req.body.food.name,
            price: req.body.food.price,
            quantity: req.body.food.quantity,
            image: req.body.food.image
        });
        model.Food.countDocuments({ name: food.name }).then(count => {
            if (count == 0) {
                food.save()
                    .then(data => { res.json({ message: "Food Added Successfully" }) })
                    .catch(error => { res.status(serverError).json(serverErrorMessage); console.log(error.message) })
            } else {
                res.status(unauthorizedError).json(unauthorizedErrorMessage);
            }
        })
    } else {
        res.status(badRequestError).json(badRequestErrorMessage);
    }
}



const updateFood = (req, res) => {
    if (req.body.hasOwnProperty("food") &&
        req.body.food.hasOwnProperty("_id")) {

        var food = req.body.food;
        model.Food.countDocuments({ _id: food._id }).then(count => {
            if (count == 0) {
                res.status(notFoundError).json(notFoundErrorMessage);
            } else {
                model.Food.updateOne({ _id: food._id }, { $set: food })
                    .then(data => { res.json({ message: "Food Updated Successfully" }) })
                    .catch(error => { res.status(serverError).json(serverErrorMessage); console.log(error.message) })

            }
        })
    } else {
        res.status(badRequestError).json(badRequestErrorMessage);
    }
}


const deleteFood = (req, res) => {
    var id = req.query.id;
    if (id) {
        model.Food.findByIdAndDelete(id)
            .then(data => { res.json({ message: "Food Deleted Successfully" }) })
            .catch(error => { res.status(serverError).json(serverErrorMessage); console.log(error.message) })
    } else {
        res.status(badRequestError).json(badRequestErrorMessage);
    }
}


module.exports = {
    getAllFood,
    getFood,
    addFood,
    updateFood,
    deleteFood
}



