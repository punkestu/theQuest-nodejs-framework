const route = require("express").Router();
const { body } = require("express-validator");
const {
  HomePage,
  NotfoundPage,
  RegisterPage,
  LoginPage,
} = require("../app/controllers/Home");
const { Login, Register } = require("../app/controllers/Auth");
const { isAuth, notAuth, authToken } = require("../app/middlewares/Auth");

route.get("/", authToken, HomePage);

route.get("/login", [authToken, notAuth], LoginPage);
route.get("/register", [authToken, notAuth], RegisterPage);
route.post("/login", [authToken, notAuth], Login);
route.post(
  "/register",
  [authToken, notAuth],
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

route.get("/home", [authToken, isAuth], HomePage);

route.use(NotfoundPage);

module.exports = route;
