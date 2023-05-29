const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  //Authorization Bearer [tokenValue]
  const token = authHeader.split(" ")[1]; //[tokenValue]

  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }

  try {
    decodedToken = jwt.verify(token, process.env.TOKEN_SUPER_KEY);
  } catch (err) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.userId = decodedToken.userId;
};
