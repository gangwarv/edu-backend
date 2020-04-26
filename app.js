var mongoose = require("mongoose");
var express = require("express");
var path = require("path");
var cors = require("cors");
var graphqlMiddleware = require("./graphql");
var authMiddleware = require("./middleware/auth.middleware");

var { MONGODB_URL } = require("./keys");

var app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/graphql", authMiddleware, graphqlMiddleware);

// app.get("/", function(req, res, next) {
//   res.send("Express App! " + MONGODB_URL);
// });
app.use(['/', '/*'], function(req, res, next) {
  res.sendFile(path.join(__dirname, './public', 'index.html'));
 });

// 'mongodb+srv://vishal:vishal@studentcluster-k7i07.mongodb.net/eduerp?retryWrites=true&w=majority'
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true
  //useCreateIndex:true
})
.then(_=>console.log('mongo connected'))
.catch(_=>console.log(_));

module.exports = app;
