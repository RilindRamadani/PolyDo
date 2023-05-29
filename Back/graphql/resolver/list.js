const List = require("../../models/list");

module.exports = {
  createList: (args, request) => {
    if (!request.isAuth) {
      throw new Error("Unauthenticated");
    }

    console.log(request.isAuth);
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
