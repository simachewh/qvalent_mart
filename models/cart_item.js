/**
 * Created by Simachew on 22-May-16.
 */

var mongoose = require("mongoose");
var Product = require("../models/Product");

var Schema = mongoose.Schema;

/**
 * Define a model for the cart items.
 */
var CartItemSchema = new Schema({
    product: Product,
    quantity: {type: Number, required: true},
    totalPrice: product.unitPrice * quantity
});

module.exports = mongoose.model("CartItem", CartItemSchema);