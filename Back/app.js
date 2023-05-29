const express = require("express");
const connectDB = require("./data/database");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const rootSchema = require("./graphql/schema/index");
const rootResolver = require("./graphql/resolver/index");
const isAuth = require("./middleware/is-auth");

const app = express();

const port = 3000;

app.use(bodyParser.json());

//will run on every request, since we cant lock like on REST
app.use(isAuth);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: rootSchema,
    rootValue: rootResolver,

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
