const express = require("express");
const cors = require('cors');
const mysql = require("mysql");
const routes = require("./routes");
require('dotenv').config();


const app = express();

app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(process.cwd() + "/public"));

app.use(express.json());

app.use(cors());
app.options('*', cors());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something is broken!');
});

app.use("/", routes);


module.exports = app;