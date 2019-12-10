const router = require("express").Router();
const users = require("./users-model.js");
const bcrypt = require("bcryptjs");
const restricted = require("../middleware/restricted.js");

router.get("/", (req, res) => {
  res.json({ app: "Is running..." });
});

router.get("/users", restricted, async (req, res) => {
  try {
    const allUsers = await users.getUsers();
    allUsers
      ? res.json({ allUsers })
      : res.status(404).json({ message: "No users found." });
  } catch (error) {
    res.status(500).json({ message: "db error: ", error });
  }
  // }
});

router.post("/register", async (req, res) => {
  let user = req.body;
  if (!user.username || !user.password)
    res
      .status(400)
      .json({ message: "Please supply both a new username and a password." });
  else {
    try {
      const hash = bcrypt.hashSync(user.password, 12);
      user.password = hash;

      const postUser = await users.addUser(user);
      postUser
        ? res.status(201).json(postUser)
        : res
            .status(400)
            .json({ Message: "There was an error. Please try again." });
    } catch (error) {
      res.status(500).json({ message: "db error:", error });
    }
  }
});

router.post("/login", async (req, res) => {
  let user = req.body;
  if (!user.username || !user.password)
    res
      .status(400)
      .json({ message: "Please supply both a new username and a password." });
  else {
    try {
      const logUser = await users.findUser(user.username);
      if (!logUser) res.status(404).json({ message: "No such user found." });
      else if (logUser && bcrypt.compareSync(user.password, logUser.password)) {
        req.session.user = user;
        res.status(200).json({ message: "Login successful. Welcome!" });
      } else res.status(401).json({ message: "Invalid credentials." });
    } catch (error) {
      res.status(500).json({ error: "db error: ", error });
    }
  }
});

router.post;

module.exports = router;
