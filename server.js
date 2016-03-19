var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);


app.get('/airportlist', function (req, res) {
  console.log("GET request received");

  var airportlist = [
    {id:0, code: "LAX", lat: 33.9425, lon: -118.4081, level: 2},
    {id:1, code: "SFO", lat: 37.6189, lon: -122.3750, level: 2},
    {id:2, code: "SJN", lat: 34.5186, lon: -109.3789, level: 2},
    {id:3, code: "OAK", lat: 37.7214, lon: -122.2208, level: 2},
    {id:4, code: "PAO", lat: 37.4611, lon: -122.1150, level: 1},
    {id:5, code: "SJC", lat: 37.3639, lon: -121.9289, level: 1},
    {id:6, code: "JFK", lat: 40.6397, lon: -73.7789, level: 2}
  ];
  res.json(airportlist);

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
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
app.listen(8000);
console.log("server running on port 8000");