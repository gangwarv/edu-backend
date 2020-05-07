module.exports = {
  TOKEN_EXPIRY: 3000, // in seconds
  MONGODB_URL:
    process.env.DB_CONN ||  //'mongodb+srv://vishal:vishal@studentcluster-k7i07.mongodb.net/eduerp?retryWrites=true&w=majority' ||
    'mongodb://localhost:27017/eduerp?retryWrites=true' || "mongodb://eduerp-self:passw0rd@52.66.206.37:27017/eduerp?retryWrites=true&useUnifiedTopology=true",
};
