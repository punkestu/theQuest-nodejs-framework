const route = require("express").Router();
const { body } = require("express-validator");
const {
  HomePage,
  NotfoundPage,
  RegisterPage,
  LoginPage,
} = require("../app/controllers/Page");
const { Login, Register, Logout } = require("../app/controllers/Auth");
const { isAuth, notAuth, authToken } = require("../app/middlewares/Auth");
const {
  usernameGet,
  passwordVal,
  usernameUnique,
  emailUnique,
} = require("../app/middlewares/Request");

route.use("/", authToken);
route.get("/", HomePage);

// authentication
route.get("/login", [notAuth], LoginPage);
route.get("/register", [notAuth], RegisterPage);
route.get("/logout", [isAuth], Logout);
route.post(
  "/login",
  [
    notAuth,
    body("username").custom(usernameGet),
    body("password").custom(passwordVal),
  ],
  Login
);
route.post(
  "/register",
  [
    notAuth,
    body("username")
      .trim()
      .not()
      .isEmpty()
      .withMessage("You need username")
      .custom(usernameUnique),
    body("email")
      .trim()
      .not()
      .isEmpty()
      .withMessage("You need email")
      .isEmail()
      .withMessage("It is not an email")
      .custom(emailUnique),
    body("password")
      .trim()
      .not()
      .isEmpty()
      .withMessage("You need password")
      .isLength({ min: 8, max: 12 })
      .withMessage("8 - 12 characters please"),
  ],
  Register
);

route.get("/home", [isAuth], HomePage);

route.use(NotfoundPage);

module.exports = route;
