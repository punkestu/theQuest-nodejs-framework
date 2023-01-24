const route = require("express").Router();
const { body } = require("express-validator");
const {
  HomePage,
  NotfoundPage,
  RegisterPage,
  LoginPage,
  ProfilePage,
  CreateQuestPage,
  QuestsPage,
  QuestPage,
  UpdateQuestPage,
} = require("../app/controllers/Page");
const { Login, Register, Logout } = require("../app/controllers/Auth");
const {
  QuestCreate,
  QuestDelete,
  QuestUpdate,
} = require("../app/controllers/Quest");

const { isAuth, notAuth, authToken } = require("../app/middlewares/Auth");
const {
  usernameGet,
  passwordVal,
  usernameUnique,
  emailUnique,
  questNameCreate,
  questNameUpdate,
} = require("../app/middlewares/Request");
const fileUpload = require("express-fileupload");
const { submitQuest } = require("../app/controllers/Submition");

route.use("/", authToken);
route.get("/profile/:slug", ProfilePage);

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

route.get("/quest", QuestsPage);

route.get("/quest/create", [isAuth], CreateQuestPage);
route.post(
  "/quest/create",
  [
    isAuth,
    body("name")
      .not()
      .isEmpty()
      .withMessage("Set the name please")
      .custom(questNameCreate),
    body("point").not().isEmpty().withMessage("You need a point for quest"),
  ],
  QuestCreate
);

route.get("/quest/submit/:slug", [isAuth], (req, res) => {
  return res.render("pages/createSubmition", {
    slug: req.params.slug,
  });
});

route.post(
  "/quest/submit/:slug",
  [isAuth],
  fileUpload({
    createParentPath: true,
  }),
  submitQuest
);

route.get("/quest/update/:slug", [isAuth], UpdateQuestPage);
route.post(
  "/quest/update/:slug",
  [
    isAuth,
    body("name")
      .not()
      .isEmpty()
      .withMessage("Set the name please")
      .custom(questNameUpdate),
    body("point").not().isEmpty().withMessage("You need a point for quest"),
  ],
  QuestUpdate
);
route.get("/quest/delete/:slug", [isAuth], QuestDelete);
route.get("/quest/:slug", QuestPage);
route.get("/leaderboard", (_, res) => {
  return res.render("pages/leaderboard");
});
route.get("/", HomePage);

route.use("/", [authToken], NotfoundPage);

module.exports = route;
