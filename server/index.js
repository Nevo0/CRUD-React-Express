const express = require("express");
// const jsonServer = require("json-server");
const path = require("path");
const logger = require("./middleware/logger");

const app = express();
const PORT = process.env.PORT || 5000;
// ...
// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

// init middleware
app.use(logger);

// Post API routes
app.use("/api/posts", require("./routes/api/posts"));

app.listen(PORT, console.log(`Serwer started on port ${PORT}`));
