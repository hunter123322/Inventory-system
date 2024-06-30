console.clear();

const PORT = process.env.PORT || 3000;

const express = require("express");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const router = require("./routes/router.js");
const errorController = require("./controllers/errorController.js");
const cookie = require("./controllers/cookieController.js");

const app = express();

// Set view engine
app.set("view engine", "ejs");

// Security middleware
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(morgan("combined"));
app.use(
  cors({
    origin: "http://localhost:3000/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Body parser middleware
app.use(express.json());

// Cookie middleware
app.use(cookie);

// Routes
app.use("/", router);

// Error handling middleware
app.use(errorController.respondNoResourcesFound);
app.use(errorController.respondInternalError);

// Start the server
app.listen(PORT, () => {
  console.log(`The server is running at PORT ${PORT}`);
});
