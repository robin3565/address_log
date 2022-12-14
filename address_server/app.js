const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("./mysql");

const port = 8080;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// routing
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const notify = require('./routes/notify');
app.use('/', notify)

const login = require('./routes/login');
app.use('/', login)

const address_api = require('./routes/address_api');
app.use('/', address_api)

module.exports = app;
