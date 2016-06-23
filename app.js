var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');
var errorhandler = require('errorhandler');

var staticPages = require('./routes/staticPages');

var app = express();

var exphbs = require('express-handlebars');

var uristring = process.env.WUKONG_MONGO_URL;

app.engine('handlebars', exphbs.create({
  defaultLayout: 'static',
  partialsDir: 'views/partials/'
}));
app.set('view engine', 'handlebars');

app.use(cors());
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// static resource for static page and angular
app.use(express.static(__dirname + '/public/'));

app.use('/', staticPages);

// Handle 404
app.use(function(req, res) {
  console.log(req.url);
  res.status(404).redirect('/404.html');
});

// Error Handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(errorhandler());
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
