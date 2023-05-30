import Task from "../../models/task.js";
import List from "../../models/list.js";
import { ObjectId } from "mongodb";

export default {
  tasks: () => {
    return Task.find()
      .populate({
        path: "subTasks",
        model: "Task",
      })
      .then((tasks) => {
        return tasks.map((task) => {
          return { ...task._doc };
        });
      })
      .catch((err) => {});
  },

  task: (id) => {
    return Task.findOne({ _id: new ObjectId(id) })
      .populate({
        path: "subTasks",
        model: "Task",
      })
      .then((list) => {
        return { ...list._doc };
      });
  },

  //args holds all the potential arguments it might have
  createTask: (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error("Unauthenticated");
    // }
    const task = new Task({
      title: args.title,
      description: args.description,
      dueDate: args.dueDate ? new Date(args.dueDate) : null,
      creator: null,
    });

    return task
      .save()
      .then((result) => {
        console.log(result);
        return { ...result._doc };
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },

  updateTask: (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }

    const { id, title, description, dueDate, completed } = args;

    const updateFields = {};

    if (title) {
      updateFields.title = title;
    }

    if (description) {
      updateFields.description = description;
    }

    if (dueDate) {
      updateFields.dueDate = new Date(dueDate);
    }

    //TODO : Update completed
    if (completed !== undefined) {
      updateFields.completed = completed;
    }

    return Task.findByIdAndUpdate(id, { $set: updateFields }, { new: true })
      .populate("subTasks")
      .then((updatedTask) => {
        return { ...updatedTask._doc };
      })
      .catch((err) => {
        throw err;
      });
  },

  deleteTask: async (args) => {
    try {
      const taskId = args.id;

      // Delete the task and remove references in subTasks arrays of other tasks
      const deletedTask = await Task.findByIdAndRemove(taskId);

      if (!deletedTask) {
        return false;
      }

      await Task.updateMany(
        { subTasks: taskId },
        { $pull: { subTasks: taskId } }
      );

      // Remove references to the task in the tasks array of all lists
      await List.updateMany({ tasks: taskId }, { $pull: { tasks: taskId } });

      // Delete all subtasks if the deleted task is a parent task
      await Task.deleteMany({ parentId: taskId });

      return true;
    } catch (err) {
      throw err;
    }
  },

  addSubTask: async (args, request) => {
    const subTask = await new Task({
      title: args.title || "",
      description: args.description,
      dueDate: args.dueDate ? new Date(args.dueDate) : null,
      creator: null,
      parentId: args.parentId,
    }).save();

    const parentTask = await Task.findOne({
      _id: new ObjectId(args.parentId),
    }).then((task) => {
      return { ...task._doc };
    });
    let parentSubTasks = parentTask.subTasks;

    parentSubTasks.push(subTask);

    await Task.updateOne(
      { _id: new ObjectId(args.parentId) },
      { $set: { subTasks: parentSubTasks } }
    )
      .then((response) => {
        return subTask;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  },
};
