const mongoose = require("mongoose");
const Task = require("./task");

const listSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const List = mongoose.model("List", listSchema);

module.exports = List;
