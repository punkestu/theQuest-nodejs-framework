const { sign } = require("jsonwebtoken");
const { validationResult } = require("express-validator");

function generateAccessToken(ID) {
  return sign({ user: ID }, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}

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

    const token = generateAccessToken(req.body.username);
    res.cookie("jwt", token);
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

    const token = generateAccessToken(req.body.username);
    res.cookie("jwt", token);
    res.redirect("/");
  }
}

module.exports = Auth;
