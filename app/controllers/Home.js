const UserModel = require("../models/User");

class Home {
  static async HomePage(req, res) {
    res.render("pages/index", { title: "Index", isAuth : req.user });
  }
  static LoginPage(_, res) {
    res.render("pages/login", { title: "Login" });
  }
  static RegisterPage(_, res) {
    res.render("pages/register", { title: "Register" });
  }
  static NotfoundPage(_, res) {
    res.render("pages/notfound", { title: "oops" });
  }
}

module.exports = Home;
