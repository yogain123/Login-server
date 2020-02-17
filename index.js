const express = require("express");
var app = express();
var cors = require("cors");
app.use(cors());
require("dotenv").config();
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const port = process.env.PORT || 3009;

connectDB();

var routing = require("./routing");

app.use(bodyParser.json());

app.use("/", routing);

app.listen(port);
