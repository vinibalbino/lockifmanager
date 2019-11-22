const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lockifmanager', {useNewUrlParser: true});
const engine = require('ejs-mate')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const userRouter = require('./routes/user');
const projectsRouter = require('./routes/projects');
const projectRouter = require('./routes/project');
const wemosRouter = require('./routes/wemos');
const padsRoutes = require('./routes/pads');
const padRoutes = require('./routes/pad');

var app = express();

// view engine setup
app.engine('ejs', engine)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/user', userRouter);
app.use('/projects', projectsRouter);
app.use('/project', projectRouter);
app.use('/wemos', wemosRouter);
app.use('/pads', padsRoutes);
app.use('/pad', padRoutes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
