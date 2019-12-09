const bcrypt = require("bcryptjs");
const users = require("../routes/users-model.js");

function restricted(req, res, next) {
  const { username, password } = req.headers;

  if (!username || !password)
    res.status(401).json({ message: "You shall not pass!" });
  else {
    next();
  }
}

module.exports = restricted;
