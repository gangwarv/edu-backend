const serverless = require("serverless-http");
const app = require("./app");
const handler = serverless(app);

module.exports.eduapis = async (event, context) => {
  return await handler(event, context);
};
