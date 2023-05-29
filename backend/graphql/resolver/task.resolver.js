import Task from "../../models/task.js";
import { ObjectId } from "mongodb";

export default {
  //TODO add resolver for get task by id
  tasks: () => {
    return Task.find()
    .populate({
      path: 'subTasks',
      model: 'Task',
    }).then((tasks) => {
        return tasks.map((task) => {
          return { ...task._doc };
        });
      })
      .catch((err) => {});
  },

  //TODO: Create utils folder to write helper functions
  //args holds all the potential arguments it might have
  createTask: (args, request) => {
    // if (!request.isAuth) {
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

  addSubTask: async (args, request) => {
    const subTask = await new Task({
      title: args.title || "",
      description: args.description,
      dueDate: args.dueDate ? new Date(args.dueDate) : null,
      creator: null,
      parentId: args.parentId
    }).save();

    const parentTask = await Task.findOne({_id: new ObjectId(args.parentId)}).then((task) => { return {...task._doc}})
    let parentSubTasks = parentTask.subTasks;

    parentSubTasks.push(subTask);
    
    await Task.updateOne({_id: new ObjectId(args.parentId)}, {$set: {subTasks: parentSubTasks}})
      .then((response) => {
        return subTask;
      }).catch((error) => { 
        console.log(error);
        return false;
      })
  }

  //TODO: Delete task. Check if the user that created is only one can delete
};
