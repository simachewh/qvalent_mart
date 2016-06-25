/**
 * Created by Simachew on 22-May-16.
 */

/**
 * Collect modules to use.
 */
var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");

var config = require("./config");
var Product = require("./models/Product");
var app = express();
var port = process.env.PORT || config.port;


/**
 * configure express app to parse json requests.
 */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/**
 * Configure express app to handle CORS (Cross Origin Resource Sharing)
 */
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Authorization");
    next();
});

/**
 * Log requests to console, for dev purposes.
 */
app.use(morgan("dev"));

/**
 * Establish connection to a MongoDB storage.
 */
mongoose.connect("mongodb://crm:crm123@ds019990.mlab.com:19990/crm-base");

/**
 * Routes for the API
 */

/**
 * Home route
 */
app.get('/', function (req, res) {
    res.send("Welcome to Qvantel Mart home");
});

var apiRouter = express.Router();

/**
 * Get the custom router for /products
 */
var productRouter = require("./routes/product-route")(app, express);
var catalogRouter = require("./routes/catalog_query_route")(app, express);

/**
 * Middle ware to intercept requests.
 */
apiRouter.use(function (req, res, next) {
    // do logging
    console.log("Somebody just came to our api");

    next();
});

// test router to make sure everything is working
// accessed at GET http://localhost:8080/api
apiRouter.get('/', function (req, res) {
    res.json({message: "Welcome to Qvantel Mart api!"});
});

apiRouter.use("/products", productRouter);
apiRouter.use("/catalog", catalogRouter);
app.use("/api", apiRouter);

// START THE SERVER
// =============================================================================
app.listen(port);
require("util").log('Magic happens on port ' + port);