const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const engine = require('ejs-mate')
const cors = require('cors');

mongoose.connect('mongodb://localhost/lockifmanager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const indexRouter = require('./src/routes/index');

const usersRouter = require('./src/routes/users');
const userRouter = require('./src/routes/user');

const projectsRouter = require('./src/routes/projects');
const projectRouter = require('./src/routes/project');

const wemosRouter = require('./src/routes/wemos');

const padRoutes = require('./src/routes/pad');
const padsRoutes = require('./src/routes/pads');
 
var app = express();

// view engine setup
app.engine('ejs', engine)
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(cors());

// Colocando as Rotas para o express enterder

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
