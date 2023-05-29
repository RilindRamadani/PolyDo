import mongoose from "mongoose";
import Task from "./task.js";

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
    tasks: [{type: mongoose.Schema.Types.ObjectId, ref: "Task" }]
  },
  { timestamps: true }
);

const List = mongoose.model("List", listSchema);

export default List;
