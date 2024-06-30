const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo"); // Corrected import for connect-mongo
const mongoose = require("mongoose");
const dbConnect = require("./model/databaseConnection.js"); // Assuming corrected path

const app = express();
const url = "mongodb+srv://drin123322:aldrin@cluster0.bao7afq.mongodb.net/";

// Connect to MongoDB
dbConnect(); // Assuming connectToDatabase() is exported correctly

const db = mongoose.connection;

const sessionMiddleware = session({
  secret: "Mykey", // Replace with a strong secret key for session encryption
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: url }), // Use MongoStore.create() with mongoUrl option
  cookie: {
    maxAge: 3600000, // Example: Session expires after 1 hour (in milliseconds)
    secure: false, // Set to true if using HTTPS
    httpOnly: true, // Cookie accessible only through HTTP(S) protocol, not JavaScript
  },
});

app.use(sessionMiddleware);

// Example route
app.get("/", (req, res) => {
  // Access session data
  if (req.session.username) {
    res.send(`Hello ${req.session.username}`);
  } else {
    res.send("Hello guest");
  }
});

// Example route in Express.js
app.get("/setUsername", (req, res) => {
  const username = "aldrin";
  req.session.username = username; // Set username in session
  res.send("Username set in session!");
});

app.get("/profile", (req, res) => {
  if (req.session.username) {
    res.send(`Welcome ${req.session.username} to your profile!`);
  } else {
    res.send("Please log in first.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
