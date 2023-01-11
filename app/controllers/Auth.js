const TokenModel = require("../models/Token");
const { sign } = require("jsonwebtoken");
const { validationResult } = require("express-validator");

async function generateAccessToken(ID) {
  token = sign({ user: ID }, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
  await TokenModel.login(token, ID);
  return token;
}

class Auth {
  static async Login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("pages/login", {
        title: "Login",
        old: req.body,
        errors: errors.mapped(),
      });
    }

    const token = await generateAccessToken(req.body.username);
    res.cookie("jwt", token);
    res.redirect("/");
  }
  static async Register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("pages/register", {
        title: "Register",
        old: req.body,
        errors: errors.mapped(),
      });
    }

    const token = await generateAccessToken(req.body.username);
    res.cookie("jwt", token);
    res.redirect("/");
  }
  static async Logout(req, res) {
    await TokenModel.logout(req.cookies["jwt"]);
    res.redirect("/login");
  }
}

module.exports = Auth;
