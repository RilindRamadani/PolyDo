import express from "express";
import connectDB from "./data/database.js";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import rootSchema from "./graphql/schema/index.schema.js";
import rootResolver from "./graphql/resolver/index.resolver.js";
import isAuth from "./middleware/is-auth.js";


const app = express();

const port = 3000;

app.use(bodyParser.json());

//will run on every request, since we cant lock like on REST
// app.use(isAuth);

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
