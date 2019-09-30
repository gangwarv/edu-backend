var mongoose = require('mongoose');
var express = require('express');
var path = require('path');
// var logger = require('morgan');
var cors = require('cors')
var graphqlMiddleware = require('./graphql');
var authMiddleware = require('./middleware/auth.middleware');
var delay = require('./middleware/delay');

var app = express();

app.use(cors())
// app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/graphql', delay, authMiddleware, graphqlMiddleware);

app.get('/', function(req, res, next){
  res.send('Express App')
});


//mongodb+srv://<username>:<password>@studentcluster-k7i07.mongodb.net/test?retryWrites=true&w=majority
// mongoose.connect('mongodb+srv://vishal:vishal@studentcluster-k7i07.mongodb.net/eduerp?retryWrites=true&w=majority', 
mongoose.connect('mongodb://localhost:27017/eduerp?retryWrites=true', 
{ 
  useNewUrlParser: true,
  //useCreateIndex:true 
});

module.exports = app;
