const bookResolver = require('./book.resolver');
const authResolver = require('./auth.resolver');

module.exports = {
    ...bookResolver,
    ...authResolver
}