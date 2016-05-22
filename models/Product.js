/**
 * Created by Simachew on 22-May-16.
 */

/**
 * Collecting necessary modules
 */
var mongoose = require("mongoose");
var textSearch = require("mongoose-text-search")

/**
 * Init schema
 */
var Schema = mongoose.Schema;

var maxlength = [15, 'The value of path `{PATH}` (`{VALUE}`) exceeds the maximum allowed length ({MAXLENGTH}).'];

var ProductSchema = new Schema({
    name: {type: String, required: true, unique: true, lowercase: true, maxlength: maxlength},
    unitPrice: {type: Number, required: true, index: true},
    stock: {type: Number, requred: true}
});

//add text search plugin to the mongoose schema.
ProductSchema.plugin(textSearch);

//add a text index to the name field, so it can be searched for text faster.
ProductSchema.index({name: "text"});
module.exports = mongoose.model("Product", ProductSchema);