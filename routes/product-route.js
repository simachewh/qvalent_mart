/**
 * Created by Simachew on 22-May-16.
 */

/**
 * Collect modules to use.
 */
var config = require("../config");
var Product = require("../models/Product");

var bodyParser = require("body-parser");

module.exports = function (app, express) {

    var productRoute = express.Router();

    /**
     * Route at /products
     */
    productRoute.route("/")

    /**
     * Get all the list of prodcuts.
     */
        .get(function (req, res) {
            Product.find({}, function (err, products) {
                if (err) {
                    return res.send(err);
                }
                return res.json(products);
            })
        })
        /**
         * PROGRAMMING CHALLENGE - TASK 1
         * ADDING A NEW PRODUCT TO THE CATALOG
         *
         * Add a new product to the server.
         */
        .post(function (req, res) {
            var product = new Product();
            product.name = req.body.name;
            product.unitPrice = req.body.unitPrice;
            product.stock = req.body.stock;

            product.save(function (err) {
                if (err) {
                    if (err.code = 11000) {
                        return res.json({
                            success: false, message: "This product already exists.",
                            error: err
                        });
                    }
                    else {
                        return res.send(err);
                    }
                }
                res.json({message: "product created"});
            })
        });

    /**
     * Route map /products/productId
     */
    productRoute.route("/:productId")

    /**
     * PROGRAMMING CHALLENGE - TASK 1 - EXTRA (GET PRODUCT BY ID)
     * get a product by the given id.
     */
        .get(function (req, res) {
            Product.findById(req.params.productId, function (err, product) {
                if (err) {
                    return res.send(err);
                }

                return res.json(product);
            });
        })
        /**
         * PROGRAMMING CHALLENGE - TASK 1
         * UPDATING A PRODUCT IN THE CATALOG
         *
         * Update a product of id productId with the information
         * provided by the request params.
         */
        .put(function (req, res) {
            Product.findById(req.params.productId, function (err, product) {
                if (err) {
                    return res.send(err);
                }

                if (req.body.name) {
                    product.name = req.body.name
                }
                if (req.body.unitPrice) {
                    product.unitPrice = req.body.unitPrice
                }
                if (req.body.stock) {
                    product.stock = req.body.stock
                }

                product.save(function (err) {
                    if (err) {
                        return res.send(err);
                    }
                    res.json({message: "product updaed"})
                })
            })
        })
        /**
         * PROGRAMMING CHALLENGE - TASK 1
         * REMOVING PRODUCT FROM CATALOG
         *
         * Delete a product by the given id.
         */
        .delete(function (req, res) {
            Product.remove({
                _id: req.params.productId
            }, function (err, product) {
                if (err) {
                    return res.send(err);
                }

                res.json({
                    message: "Product removed",
                    product: product
                })
            })
        });

    

    return productRoute;
};