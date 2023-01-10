const { validationResult } = require("express-validator");

class Auth {
  static Login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("pages/login", {
        title: "Login",
        old: req.body,
        errors: errors.mapped(),
      });
    }

    res.cookie("auth_token", "test123");
    res.redirect("/");
  }
  static Register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("pages/register", {
        title: "Register",
        old: req.body,
        errors: errors.mapped(),
      });
    }

    res.cookie("auth_token", "test123");
    res.redirect("/");
  }
}

module.exports = Auth;
