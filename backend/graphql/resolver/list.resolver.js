import List from '../../models/list.js';
import Task from '../../models/task.js';
import { ObjectId } from 'mongodb';

export default {
  lists: () => {
    return List.find()
      .populate("tasks")
      .then((lists) => {
        return lists.map((list) => {
          return { ...list._doc };
        });
      })
      .catch((err) => {});
  },
  list: (id) => {
    return List.findOne({_id: new ObjectId(id)}).populate("tasks").then((list) => { return {...list._doc}});  
  },
  createList: (args, request) => {
    // if (!request.isAuth) {
    //   throw new Error("Unauthenticated");
    // }

    // console.log(request.isAuth);
    const list = new List({
      name: args.name,
      description: args.description,
    });

    return list
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
  addTaskToList: async (args, request) => {
    const list = await List.findOne({_id: new ObjectId(args.listId)}).then((list) => { return {...list._doc}});
    const task = await Task.findOne({_id: new ObjectId(args.taskId)}).then((task) => {return {...task._doc}})

    console.log(list);
    console.log(task);
    let listTasks = list.tasks;
    listTasks.push(task)

    await List.updateOne({_id: new ObjectId(args.listId)}, {$set: {tasks: listTasks}})
      .then((response) => {
        return response.acknowledged;
      }).catch((error) => { 
        console.log(error);
        return false;
      })
  }
};
