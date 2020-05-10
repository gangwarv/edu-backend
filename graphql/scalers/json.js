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
  // No need, not going to send json from resolver
  return value != null ? JSON.stringify(value) : null;
}

function parseValue(value) {
  return returnOnError(() => (value == null ? null : JSON.parse(value)), null);
}

function parseLiteral(ast) {
  return ast.kind === Kind.STRING ? parseValue(ast.value) : null;
}

module.export = new GraphQLScalarType({
  name: "Json",
  description: "Json representation of an object.",
  serialize,
  parseValue,
  parseLiteral,
});
