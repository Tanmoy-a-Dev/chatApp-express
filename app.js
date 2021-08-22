// external imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();

// internal imports
const { notFoundHandler, errorHandler } = require('./middlewares/common/errorHandler');

// router imports
const loginRouter = require('./routers/loginRouter');
const usersRouter = require('./routers/usersRouter');
const inboxRouter = require('./routers/inboxRouter');

// from env variables
const db_string = process.env.DB_STRING,
    port = process.env.PORT,
    cookie_secret = process.env.COOKIE_SECRET;

// db connection
mongoose.connect(db_string, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connection successfull'))
    .catch(err => console.log(err.message));

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view
app.set('view engine', 'ejs')

// set static folder
app.use(express.static('public'))

// set cookie parser
app.use(cookieParser(cookie_secret));

// routig setup
app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/inbox', inboxRouter);

// error handling
// 404 page
app.use(notFoundHandler);

// common Error
app.use(errorHandler);

// listening app
app.listen(port, () => console.log(`app is listening to ${port}`));