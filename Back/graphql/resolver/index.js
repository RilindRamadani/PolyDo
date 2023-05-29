const bcrypt = require("bcryptjs");

const Task = require("../../models/task");
const User = require("../../models/user");
const List = require("../../models/list");
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
  createTask: (args) => {
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

  createUser: (args) => {
    return User.findOne({
      $or: [
        { username: args.UserInput.username },
        { email: args.UserInput.email },
      ],
    })
      .then((user) => {
        if (user) {
          throw new Error("User already exists");
        }
        return bcrypt.hash(args.UserInput.password, 12);
      })
      .then((hashedPassword) => {
        const user = new User({
          email: args.UserInput.email,
          password: hashedPassword,
          username: args.UserInput.username,
          firstName: args.UserInput.firstName,
          lastName: args.UserInput.lastName,
        });

        return user.save();
      })
      .then((result) => {
        return { ...result._doc, password: null };
      })
      .catch((err) => {
        throw err;
      });
  },

  createList: (args) => {
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
};
