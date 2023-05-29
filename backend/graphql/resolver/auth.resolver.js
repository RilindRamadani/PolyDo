import bcrypt from "bcryptjs";
import User from "../../models/user.js";
import jwt from "jsonwebtoken";
export default {
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
  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("User does not exist");
    }

    //async comparison of password hash
    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      throw new Error("Password is incorrect");
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.TOKEN_SUPER_KEY,
      { expiresIn: "1h" }
    );

    return { userId: user.id, token: token, tokenExpiration: 1 };
  },
};
