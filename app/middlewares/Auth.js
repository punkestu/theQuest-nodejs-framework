const TokenModel = require("../models/Token");
const { verify } = require("jsonwebtoken");

class Auth {
  static async authToken(req, _, next) {
    const authHeader = req.cookies["jwt"];
    const token = authHeader;
    if (token == null) {
      req.user = null;
    } else {
      req.user = await verify(token, process.env.TOKEN_SECRET, async (err, user) => {
        const tokenExists = await TokenModel.exists(token);
        if (err || !tokenExists) {
          return null;
        } else {
          return user;
        }
      });
    }

    next();
  }
  static notAuth(req, res, next) {
    if (req.user != null) {
      return res.redirect("/");
    }
    next();
  }
  static isAuth(req, res, next) {
    if (req.user == null) {
      return res.redirect("/login");
    }
    next();
  }
}

module.exports = Auth;
