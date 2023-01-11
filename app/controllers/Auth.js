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
    return res.redirect("/");
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
    return res.redirect("/");
  }
  static async Logout(req, res) {
    const tokenExists = await TokenModel.exists(req.cookies["jwt"]);
    if (tokenExists) {
      TokenModel.logout(req.cookies["jwt"])
        .catch((err) => {
          console.log(err);
        })
        .finally(() => res.redirect("/login"));
    } else {
      return res.redirect("/login");
    }
  }
}

module.exports = Auth;
