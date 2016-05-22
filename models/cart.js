/**
 * Created by Simachew on 22-May-16.
 */

var mongoose = require("mongoose");
var Product = require("../models/Product");
var CartItem = require("../models/cart_item");

var Schema = mongoose.Schema;

/**
 * Define model for the Cart.
 */
var CartSchema = new Schema({
    items: [CartItem],
    grandTotal: {type: Number, required: true}
});

module.exports = mongoose.model("Cart", CartSchema);