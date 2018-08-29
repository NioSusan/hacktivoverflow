const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
require("dotenv").config();

//routes
const userRoutes = require('./routes/users')
const questionRoutes = require('./routes/questions')
const answerRoutes = require('./routes/answers')

mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }
  );
  
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error"));
  db.once("open", () => {
    console.log("Connected to the database");
  });

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname+'/public'));

//routes
app.use('/', userRoutes);
app.use('/', questionRoutes);
app.use('/', answerRoutes);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.send("error");
});

module.exports = app;
