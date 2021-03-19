const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors')
const passport = require('passport');

require('./passport')

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const {key} = require('./info');
const app = express();

//troubles with update
mongoose.connect(key, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({secret: 'secret', resave: false, saveUninitialized: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/api', apiRouter);

module.exports = app;
