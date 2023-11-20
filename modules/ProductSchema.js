const { text } = require("express");
const mongoose = require("mongoose");
let schemaProduct = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  species: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  newPrice: {
    type: Number,
    required: true,
  },
  addDate: {
    type: String,
    default: Date.now(),
  },
  homePic: {
    type: Boolean,
    required: true,
    default: false,
  },
  details: {
    type: String,
    required: true,
    default:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  newArrival: {
    type: Boolean,
    require: true,
    default: false,
  },
  sale: {
    type: Boolean,
    require: true,
    default: false,
  },
});
module.exports = mongoose.model("Product", schemaProduct);
