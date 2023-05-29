const Task = require("../../models/task");

module.exports = {
  tasks: () => {
    return Task.find()
      .populate("list")
      .then((tasks) => {
        return tasks.map((task) => {
          return { ...task._doc };
        });
      })
      .catch((err) => {});
  },

  //args holds all the potential arguments it might have
  createTask: (args, request) => {
    if (!request.isAuth) {
      throw new Error("Unauthenticated");
    }
    const task = new Task({
      title: args.title,
      description: args.description,
      dueDate: new Date(args.dueDate),
      list: args.listId,
      creator: "6473e7e64beb00c3fec7ab72",
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

  //TODO: Delete task. Check if the user that created is only one can delete
};
