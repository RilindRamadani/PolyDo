const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  try {
    const user = process.env.MONGODB_USER;
    const password = process.env.MONGODB_PASSWORD;

    await mongoose.connect(
      `mongodb+srv://${user}:${password}@polydocluster.aygf89v.mongodb.net/`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("Connected to the database!");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
};

module.exports = connectDB;
