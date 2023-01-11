const jwt = require("jsonwebtoken");

class Auth {
  static authToken(req, _, next) {
    const authHeader = req.cookies["jwt"];
    const token = authHeader;
    if (token == null) {
      req.user = null;
    } else {
      jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err);

        if (err) req.user = null;
        else {
          console.log(user);
          req.user = user;
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
