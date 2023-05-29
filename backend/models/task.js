import mongoose from "mongoose";
import List from './list.js';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    dueDate: {
      type: Date,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    subTasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
    }
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
