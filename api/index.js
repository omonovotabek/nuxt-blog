require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require('morgan')
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"))

// const mongoose = require("mongoose");
// mongoose
//   .connect(`${process.env.DB_URL}`)
//   .then(() => console.log("Mongodb connect .."))
//   .catch((e) => console.log(e));

//   const routes = require("./routes");
//   app.use("/api", routes);
//   app.use(errorHandler)

// const { loadNuxt, build } = require("nuxt");
// const isDev = process.env.NODE_ENV !== "production";
// async function start() {
//   const nuxt = await loadNuxt(isDev ? "dev" : "start");
//   app.use(nuxt.render);
//   if (isDev) {
//     build(nuxt);
//   }
//   app.listen(process.env.PORT || 3000, () =>
//     console.log(`Server listen = ${process.env.PORT}`)
//   );
// }

// start();
module.exports = app