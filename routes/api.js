const route = require("express").Router();

const UserModel = require("../app/models/User");

route.get("/users", async (_, res) => {
  res.send({
    msg: "Welcome",
    data: await UserModel.all(),
  });
});

module.exports = route;
