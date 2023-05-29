const authResolver = require("./auth");
const listResolver = require("./list");
const taskResolver = require("./task");

const rootResolver = {
  ...authResolver,
  ...listResolver,
  ...taskResolver,
};

module.exports = rootResolver;
