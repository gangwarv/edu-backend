const { Kind } = require("graphql/language");
const { GraphQLScalarType } = require("graphql");

const returnOnError = (operation, alternative) => {
  try {
    return operation();
  } catch (e) {
    return alternative;
  }
};

function serialize(value) {
  console.log('serialize', typeof value)
  // No need, not going to send json from resolver
  return value != null ? JSON.stringify(value) : null;
}

function parseValue(value) {
  console.log('parseValue', typeof value)
  return returnOnError(() => (value == null ? null : JSON.parse(value)), null);
}

function parseLiteral(ast) {
  console.log('KIND',ast.kind)
  return ast.kind === Kind.OBJECT ? parseValue(ast.value) : null;
}

module.export = new GraphQLScalarType({
  name: "Json",
  description: "Json representation of an object.",
  serialize,
  parseValue,
  parseLiteral,
});
