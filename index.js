require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);

const websiteRoute = require("./routes/user");
app.use(websiteRoute);

app.get("/website");

app.listen(process.env.PORT, (req, res) => {
  console.log("server runned");
});
