const express = require("express");

const apiRouter = require("./routes");
const mConfig = require("./middleware");

const server = express();

mConfig(server);

server.use("/api", apiRouter);

module.exports = server;
