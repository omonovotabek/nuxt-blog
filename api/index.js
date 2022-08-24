require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload")
const cors = require("cors");
const path = require("path");
const errorHandler = require("./middleware/error")
const routes = require("./routes")
// const morgan = require('morgan')

const app = express();
app.use(express.json());
app.use(cors());  
app.use(fileUpload({}))   
app.use(express.static('static'))   
app.use(routes);
app.use(errorHandler)
// app.use(morgan("dev"))

// if (process.env.NODE_ENV) {
//   app.use(express.static(path.resolve(process.cwd(), 'client/build')))
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(process.cwd(), 'client/build/index.html'))
//   })
// }

mongoose
  .connect(`${process.env.DB_URL}`)
  .then(() => console.log("Mongodb connect .."))
  .catch((e) => console.log(e));




module.exports = app