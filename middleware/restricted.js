const bcrypt = require("bcryptjs");
const users = require("../routes/users-model.js");

function restricted(req, res, next) {
  const { username, password } = req.headers;

  if (!username || !password)
    res.status(401).json({ message: "You shall not pass!" });
  else {
    try {
      const getUser = users.findUser(username);
      if (!getUser) res.status(404).json({ message: "You shall not pass!" });
      else if (getUser && bcrypt.compareSync(password, getUser.password))
        next();
    } catch (error) {
      res.status(500).json({ error: "db error: ", error });
    }
  }
}

module.exports = restricted;
