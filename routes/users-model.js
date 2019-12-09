const db = require("../data/dbConfig.js");

function getUsers() {
  return db("users");
}

function findUser(username) {
  return db("users")
    .where({ username })
    .first();
}

function addUser(user) {
  return db("users")
    .insert(user)
    .then(user => getByID(user[0]));
}

module.exports = {
  getUsers,
  findUser,
  addUser
};
