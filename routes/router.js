const bodyParser = require("body-parser");
const express = require("express");

const { signUp, signIn } = require("../model/user.js");
const { insertItem, updateItem, getItems } = require("../model/itemLogic.js");
const hasher = require("../controllers/passwordHasher.js");

const router = express.Router();

router.use(express.static("view"));
router.use(bodyParser.json());

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something Broke");
});

// Home routes
router.get("/", (req, res) => {
  res.send("Welcome to home page ");
});
router.post("/", (req, res) => {
  res.send("Post welcome to home page ");
});

// User routes
router.get("/signUp", (req, res) => {
  res.send("Welcome to the page");
});

router.post("/signUp", async (req, res) => {
  try {
    const user = req.body;
    const hashedPassword = await hasher(user.password);
    user.password = hashedPassword;
    await signUp(user);
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});

router.get("/items", async (req, res) => {
  try {
    const items = await getItems(req.query);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Error searching for items" });
  }
});

router.get("/items/insert", (req, res) => {
  res.json({
    message: "Insert your item",
  });
});

router.post("/items/insert", async (req, res) => {
  try {
    const item = { ...req.body };
    await insertItem(item);
    res.status(200).json({ message: "Item inserted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error inserting item" });
  }
});

router.get("/items/update", (req, res) => {
  res.json({
    message: "Update your item",
  });
});

router.put("/items/update", async (req, res) => {
  try {
    const { filter, update } = req.body;

    await updateItem(filter, update);
    res.status(200).json({ message: "Item updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error Updating item" });
  }
});

module.exports = router;
