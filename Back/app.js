const express = require("express");
const connectDB = require("./data/database");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!ssssssssssssssssssssssssssssssss");
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("Server started on port 3000");
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
