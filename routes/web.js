const route = require("express").Router();

// Controllers
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
  judgePage,
  leaderBoardPage,
  submitionPage,
} = require("../app/controllers/Page");
const { Login, Register, Logout } = require("../app/controllers/Auth");
const {
  QuestCreate,
  QuestDelete,
  QuestUpdate,
} = require("../app/controllers/Quest");
const { submitQuest, judgeSubmition } = require("../app/controllers/Submition");

// Middlewares
const { isAuth, notAuth, authToken } = require("../app/middlewares/Auth");
const {
  postLogin,
  postRegister,
  postQuestCreate,
  postSubmit,
  postQuestUpdate,
} = require("../app/middlewares/Request");

route.use("/", authToken);
route.get("/profile/:slug", ProfilePage);

// authentication
route.get("/login", [notAuth], LoginPage);
route.get("/register", [notAuth], RegisterPage);
route.get("/logout", [isAuth], Logout);
route.post("/login", [notAuth, postLogin], Login);
route.post("/register", [notAuth, postRegister], Register);

route.get("/quest", QuestsPage);

route.get("/quest/create", [isAuth], CreateQuestPage);
route.post("/quest/create", [isAuth, postQuestCreate], QuestCreate);

route.get("/quest/submit/:slug", [isAuth], submitionPage);
route.post("/quest/submit/:slug", [isAuth, postSubmit], submitQuest);

route.get("/quest/update/:slug", [isAuth], UpdateQuestPage);
route.post("/quest/update/:slug", [isAuth, postQuestUpdate], QuestUpdate);

route.get("/quest/delete/:slug", [isAuth], QuestDelete);

route.get("/quest/:slug/:author", [isAuth], judgePage); // TODO judgePage on Controller
route.post("/quest/:slug/:author/point", [isAuth], judgeSubmition);

route.get("/quest/:slug", QuestPage);

route.get("/leaderboard", leaderBoardPage); // TODO leaderBoardPage on Controller
route.get("/", HomePage);

route.use("/", [authToken], NotfoundPage);

module.exports = route;
