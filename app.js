var mongoose = require('mongoose');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors')
var graphqlMiddleware = require('./graphql');
var authMiddleware = require('./middleware/auth.middleware');
var delay = require('./middleware/delay');

var app = express();
app.use(function(req,res,next){setTimeout(next,1000)});

app.use(cors())
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'jade')

app.use('/graphql', delay, authMiddleware, graphqlMiddleware);

app.get('/', function(req, res, next){
  // res.render('index')
  res.send('Express App')
});



mongoose.connect('mongodb://localhost:27017/eduerp?retryWrites=true', 
{ 
  useNewUrlParser: true,
  //useCreateIndex:true 
});

module.exports = app;
