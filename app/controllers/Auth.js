const TokenModel = require("../models/Token");
const UserModel = require("../models/User");
const { sign } = require("jsonwebtoken");
const { validationResult } = require("express-validator");

async function generateAccessToken(ID) {
  token = sign({ user: ID }, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
  await TokenModel.login(token, ID);
  return token;
}

const Controller = {
  Login: async (req, res) => {
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
  },
  Register: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("pages/register", {
        title: "Register",
        old: req.body,
        errors: errors.mapped(),
      });
    }

    await UserModel.create({
      data: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      },
    });

    const token = await generateAccessToken(req.body.username);
    res.cookie("jwt", token);
    return res.redirect("/");
  },
  Logout: async (req, res) => {
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
  },
};

module.exports = Controller;
