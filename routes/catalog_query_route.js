/**
 * Created by Simachew on 22-May-16.
 */

var config = require("../config");
var Product = require("../models/Product");

module.exports = function (app, express) {

    var catalogQueryRoute = express.Router();


    /**
     * PROGRAMMING CHALLENGE - TASK 3
     *
     * Querying products from product catalog with basic pagination
     * (e.g. 100 products / query), sorted by given sorting key (name or price).
     *
     * Make a call to this service endpoint like:
     * http://localhost:8080/api/catalog/4/3/name - as in: page number 4,
     * 3 items per page and sorted by name.
     */
    catalogQueryRoute.route("/:pageNo/:pageSize/:sortBy")
        .get(function (req, res) {
            /**
             * Check if the sortBy parameter is one of the sort keys,
             * name or price.
             */
            if ((req.param("sortBy").localeCompare("name") != 0)
                && (req.param("sortBy").localeCompare("unitPrice") != 0)) {
                console.log("Sort type " + (req.param("sortBy").localeCompare("name") == 0));
                return res.json({
                    message: "No sort option by" + req.param("sortBy"),
                    sortby: ["name", "unitPrice"]
                });
            }
            var sorter = req.param("sortBy");
            var cur = Product.find({});
            cur.skip((req.param("pageNo") - 1) * req.param("pageSize"))
                .limit(req.param("pageSize"));
            if (sorter.localeCompare("name")) {
                cur.sort({unitPrice: 1});
            } else {
                cur.sort({name: 1})
            }
            cur
                .exec(function (err, products) {

                    if (err) {
                        return res.send(err);
                    }

                    return res.json(products);
                })
        });

    catalogQueryRoute.route("/")

    /**
     * PROGRAMMING CHALENGE 1 - TASK 4.
     *
     * Querying products from product catalog, grouped by price ranges
     * (with a single function call, fully customizable via input data,
     * example of range set: cheaper than 5 €, 510€, more expensive than 10€).
     *
     * Make a call to this service endpoint as:
     * http://localhost:8080/api/products/price/?minPrice=2&maxPrice=50 - price between 2 and 50
     * http://localhost:8080/api/catalog/?minPrice=25 - price range more than 25
     * http://localhost:8080/api/catalog/?maxPrice=200 - price range less than 200
     */
        .get(function (req, res) {

            /**
             * If both the minimum price and the maximum price are provided.
             */
            if (req.query.minPrice && req.query.maxPrice) {
                Product.find({
                    "unitPrice": {
                        "$gte": req.query.minPrice,
                        "$lte": req.query.maxPrice
                    }
                }, function (err, products) {
                    if (err) {
                        return res.send(err);
                    }
                    return res.json(products);
                });
            }
            /**
             * If only the maximum price is provided.
             */
            else if ((!req.param("minPrice")) && req.param("maxPrice")) {
                Product.find({"unitPrice": {"$lte": req.param("maxPrice")}},
                    function (err, products) {
                        if (err) {
                            return res.send(err);
                        }
                        return res.json(products);
                    });
            }
            /**
             * If only the minimum price is provided.
             */
            else if ((req.param("minPrice")) && !req.param("maxPrice")) {
                Product.find({"unitPrice": {"$gte": req.param("minPrice")}},
                    function (err, products) {
                        if (err) {
                            return res.send(err);
                        }
                        return res.json(products);
                    });
            }
        });

    catalogQueryRoute.route("/search/:name/:min/:max/:sort")

    /**
     * PROGRAMMING CHALLENGE 1 - TASK 5
     *
     * Searching product from catalog by matching the beginning
     * of product name, filtering the results within given price
     * range (min, max), and sorting by given key (name or price).
     *
     * Call on this service end point like:
     * http://localhost:8080/api/catalog/search/S/3/369/name - as in
     * catalog/search/name/minPrice/maxPrice/sortby
     */
        .get(function (req, res) {
            var sorter = req.param("sort");
            console.log("hit the search endpoint" +
                "Min: " + req.param("min") + sorter);

            /**
             * get a cursor filtered by the bigninng of the product name
             * and by price range.
             * A sort will be performed on this cursor later on
             */
            var cur = Product.find({
                name: {
                    "$regex": "^" + req.param("name"),
                    $options: "i"
                }
            }).where("unitPrice").gt(req.param("min")).lt(req.param("max"));

            /**
             * perform sort on the cursor according to the sort type given.
             */
            if (sorter.localeCompare("name")) {
                cur.sort({unitPrice: 1});
            } else {
                cur.sort({name: 1})
            }

            cur.exec(function (err, products) {
                if (err) {
                    res.send(err);
                }
                res.json(products);
            });
        });

    return catalogQueryRoute;
};