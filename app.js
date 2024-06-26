const PORT = process.env.PORT || 3000;
const express = require("express");
const helmet = require("helmet");
const router = require("./routes/router.js");
const errorController = require("./controllers/errorController.js");
const app = express();

app.set("view engine", "ejs");

app.use(helmet());
app.use(express.static("views"));
app.use(errorController.respondNoResourcesFound);
app.use(errorController.respondInternalError);

app.use("/", router);

app.listen(PORT, () => {
  console.log(`The server running at PORT ${PORT}`);
});
