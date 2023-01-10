class Auth {
  static isAuth(req, res, next) {
    if (req.cookies["auth_token"] == "test123") {
      res.redirect("/");
    }
    next();
  }
  static notAuth(req, res, next) {
    if (req.cookies["auth_token"] != "test123") {
      res.redirect("/login");
    }
    next();
  }
}

module.exports = Auth;
