const FeeItemResolver = require('./fee-item');
const FeeStructesolver = require('./fee-structure');



module.exports = {
    ...FeeItemResolver,
    ...FeeStructesolver
}