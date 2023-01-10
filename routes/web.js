const route = require("express").Router();
const { body } = require("express-validator");
const {
  HomePage,
  NotfoundPage,
  RegisterPage,
  LoginPage,
} = require("../app/controllers/Home");
const { Login, Register } = require("../app/controllers/Auth");
const { isAuth, notAuth } = require("../app/middlewares/Auth");

route.get("/", HomePage);

route.get("/login", isAuth, LoginPage);
route.get("/register", isAuth, RegisterPage);
route.post("/login", isAuth, Login);
route.post(
  "/register",
  isAuth,
  [
    body("username").trim().not().isEmpty().withMessage("You need username"),
    body("email")
      .trim()
      .not()
      .isEmpty()
      .withMessage("You need email")
      .isEmail()
      .withMessage("It is not an email"),
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

route.get("/home", notAuth, HomePage);

route.use(NotfoundPage);

module.exports = route;
