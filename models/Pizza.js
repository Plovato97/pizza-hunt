const { Schema, model, trusted } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema(
    {
    pizzaName: {
        type: String,
        required: true,
        trim: true
    },
    createdBy: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
        type: String,
        enum: ['Personal', "Small", "Medium", "Large", 'Extra Large'],
        default: "Large"

    },
    toppings: [],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);
// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

// Create the pizza model using the pizzaschema
const Pizza = model('Pizza', PizzaSchema)

// EXPORT THE PIZZA MODEL
module.exports = Pizza;