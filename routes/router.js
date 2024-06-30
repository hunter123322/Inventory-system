const express = require("express");

const {
  isAuthenticated,
  adminAuth,
} = require("../controllers/authentication.js");
const {
  signUpRouter,
  signInRouter,
  logoutRouter,
} = require("./auth.Routes.js");
const {
  userRouter,
  userUpdateRouter,
  userDeleteRouter,
} = require("./userRoutes.js");
const {
  itemRouter,
  itemInsertRouter,
  itemUpdateRouter,
  itemDeleteRouter,
} = require("./itemRoutes.js");

const router = express.Router();

router.post("/signUp", signUpRouter);
router.post("/signIn", signInRouter);
router.post("/logout", logoutRouter);

router.get("/users", isAuthenticated, adminAuth, userRouter);
router.put("/users/update", isAuthenticated, adminAuth, userUpdateRouter);
router.delete("/users/delete", isAuthenticated, adminAuth, userDeleteRouter);

router.get("/item", isAuthenticated, itemRouter);
router.post("/item/insert", isAuthenticated, itemInsertRouter);
router.put("/item/update", isAuthenticated, itemUpdateRouter);
router.delete("/item/:barcode", isAuthenticated, itemDeleteRouter);

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something Broke");
});

module.exports = router;
