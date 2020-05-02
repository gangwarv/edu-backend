var mongoose = require("mongoose");
require("./services/mongo-patch");
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

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex:true,
  useUnifiedTopology: true
})
.then(_=>console.log('mongo connected'))
.catch(_=>console.log(_));

module.exports = app;
