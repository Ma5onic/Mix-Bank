process.env.NODE_ENV = process.env.NODE_ENV || 'development'

let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let compression = require('compression');
let session = require('express-session');


let index = require('./routes/index');
let users = require('./routes/users');

let server = express();

server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//server.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'public')));
server.use(compression())

// express-sessions setup
server.use(session({
  secret: 'blueberry pie',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 600000
  }
  // db: knex
}))

server.use('/', index);
server.use('/users', users);

// catch 404 and forward to error handler
server.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (server.get('env') === 'development') {
  server.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// production error handler
// no stacktraces leaked to user
server.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = server;
