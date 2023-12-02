const mongoose = require("mongoose");
let schemaUser = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    session: {
        type: String,
        required: true,
        default: " ",
    }, 
    orders: {
        type: Array,
        require: true,
        default:[],
    },
    cart: {
        type: Array,
        require: true,
        default:[],
    }
})
module.exports = mongoose.model("User", schemaUser);