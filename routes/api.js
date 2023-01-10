const route = require("express").Router();

route.get("/", (_, res) => {
  res.send({
    msg: "Welcome",
  });
});

module.exports = route;
