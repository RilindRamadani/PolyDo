const express = require("express");
const connectDB = require("./data/database");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolver/index");

const app = express();

const port = 3000;

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,

    rootValue: graphQlResolvers,

    graphiql: true,
  })
);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("Server started on port 3000");
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
