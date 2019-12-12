var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
const LocalStrategy = require('passport-local').Strategy;
const models = require('./models');
var cors = require('cors')
const passport = require('passport');
const PROD_CONFIG = require('./config/production');
const DEV_CONFIG = require('./config/dev');
const CONFIG = process.env.NODE_ENV == 'production' ? PROD_CONFIG : DEV_CONFIG;

var app = express();
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(token, done) {
      UserDetails.findOne({
        token: token
      }, function(err, user) {
        if (err) {
          return done(err);
        }

        if(user){
          return done(null, user);
        } else {
          return done(err);
        }
      });
  }
));


passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function(err, user) {
    cb(err, user);
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', productsRouter);
app.use('/users', usersRouter);

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

models.db(CONFIG.DB_URL).then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});

module.exports = app;
