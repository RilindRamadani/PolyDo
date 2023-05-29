import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const user = process.env.MONGODB_USER;
    const password = process.env.MONGODB_PASSWORD;
    const db = process.env.MONGODB_DB;

    await mongoose.connect(
      `mongodb+srv://${user}:${password}@polydocluster.aygf89v.mongodb.net/${db}`,
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

export default connectDB;
