module.exports = {
  TOKEN_EXPIRY: 600,
  MONGODB_URL: process.env.DB_CONN || 'mongodb://eduerp:passw0rd@127.0.0.1:27017/eduerp?authSource=admin&retryWrites=true&useUnifiedTopology=true' ||'mongodb://mongo-root:passw0rd@52.66.206.37:27017/eduerp?retryWrites=true' 
  // 'mongodb://52.66.206.37:27017/eduerp?retryWrites=true' || 'mongodb://localhost:27017/eduerp?retryWrites=true',
};
