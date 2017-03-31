const express           = require('express');
const path              = require('path');
const favicon           = require('serve-favicon');
const cookieParser      = require('cookie-parser');
const flash             = require('connect-flash');
const session           = require('express-session');
const expressValidator  = require('express-validator');
// const users             = require('./routes/users');
const index             = require('./routes/index');
const admin             = require('./routes/admin');
const logger            = require('morgan');
const bodyParser        = require('body-parser');
// const passport          = require('passport');
// const LocalStrategy     = require('passport-local').Strategy;
const config            = require('./config/server');

const app = express();

// Favicon
app.use(favicon(path.join(__dirname, 'public', 'images', config.favicon)));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// configure Express  
app.use(cookieParser('keyboard cat'));
// Handle Express Sessions
app.use(session({ 
  secret: 'secret', 
  saveUninitialized: true, 
  resave: true, 
  cookie: { maxAge: 3600000 }}));
// Passport init
// app.use(passport.initialize());
// app.use(passport.session());

// Show messages
app.use(flash());

app.set('views', path.join(__dirname, 'views'));

// view engine setup
app.set('view engine', 'pug');

// Enable server to serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Enable server to log requests
app.use(logger('common'));

//Validator
app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
      let namespace = param.split('.');
      let root = namespace.shift();
      let formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Authentication and Authorization Middleware
let auth = (req, res, next) => {
  if (req.session && req.session.user === config.admin.username) {
    return next();
  } else {
    return res.sendStatus(401);
  }
};

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.admin = req.session.user || null;
  next();
});

// Enable server to find our routes
app.use('/', index);
app.use('/admin', admin);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(config.server.port, () => console.log(`Server started on port ${config.server.port}...`));
