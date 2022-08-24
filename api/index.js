
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./middleware/error")
const routes = require("./routes")

const app = express();
app.use(express.json());
app.use(cors());   
app.use(routes);
app.use(errorHandler)

mongoose
  .connect(`${process.env.DB_URL}`)
  .then(() => console.log("Mongodb connect .."))
  .catch((e) => console.log(e));

module.exports = app