var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

db = require('./models/index');

User = db['User'];
UserType = db['UserType'];

Auth = require('./lib/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// configurar la sesión
app.use(session({
	secret: 'cursonodejs',
	name: 'cursonodejs',
	proxy: true,
	resave: true,
	saveUninitialized: true
}));
app.use(flash());

require('./lib/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());


var index = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');
var auth = require('./routes/auth');

app.use('/', index);
app.use('/users', users);
app.use('/admin', admin);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
