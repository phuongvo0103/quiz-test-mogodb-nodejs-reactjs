var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var db = require('./models/db');

const withAuth = require('./models/customMiddleware');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var subjectRouter = require('./routes/subjects');
var questionRouter = require('./routes/questions');
var examResultRouter = require('./routes/examResults');
var questionHistoryRouter = require('./routes/questionHistorys');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/subjects', subjectRouter);
app.use('/api/questions', questionRouter);
app.use('/api/examResults', examResultRouter);
app.use('/api/questionHistorys', questionHistoryRouter);

app.get('/api/secret', withAuth, function(req, res) {
    res.send('The password is potato');
});

app.get('/checkToken', withAuth, function(req, res) {
    res.sendStatus(200);
});

module.exports = app;
