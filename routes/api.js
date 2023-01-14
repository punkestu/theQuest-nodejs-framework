const route = require("express").Router();

const UserModel = require("../app/models/User");
const QuestModel = require("../app/models/Quest");

route.get("/users", async (_, res) => {
  res.send({
    msg: "Welcome",
    data: await UserModel.all(),
  });
});
route.get("/quests", async (_, res) => {
  res.send({
    msg: "Welcome",
    data: await QuestModel.all(),
  });
});
module.exports = route;
