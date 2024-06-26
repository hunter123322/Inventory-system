const PORT = process.env.PORT || 3000;

const express = require("express");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const router = require("./routes/router.js");
const errorController = require("./controllers/errorController.js");

const app = express();

// Set view engine
app.set("view engine", "ejs");

// Security middleware
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Serve static files from "views" directory
app.use(express.static("views"));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", router);

// Error handling middleware
app.use(errorController.respondNoResourcesFound);
app.use(errorController.respondInternalError);

// Start the server
app.listen(PORT, () => {
  console.log(`The server is running at PORT ${PORT}`);
});
