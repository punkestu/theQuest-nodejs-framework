class Home {
  static HomePage(req, res) {
    var isAuth = false;
    if (req.cookies["auth_token"] == "test123") {
      var isAuth = true;
    }
    res.render("pages/index", { title: "Index", isAuth });
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
