const { Schema, model } = require('mongoose');

const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    size: {
        type: String,
        default: "Large"
    },
    toppings: []
});

// Create the pizza model using the pizzaschema
const Pizza = model('Pizza', PizzaSchema)

// EXPORT THE PIZZA MODEL
module.exports = Pizza;