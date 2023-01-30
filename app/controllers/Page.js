const QuestModel = require("../models/Quest");
const UserModel = require("../models/User");
const { submition } = require("../../prisma/db");

const Controller = {
  HomePage: (req, res) => {
    return res.render("pages/index", { title: "Index", isAuth: req.user });
  },
  LoginPage: (_, res) => {
    return res.render("pages/login", { title: "Login" });
  },
  RegisterPage: (_, res) => {
    return res.render("pages/register", { title: "Register" });
  },
  ProfilePage: async (req, res) => {
    // const user = await UserModel.withUsername(req.params.slug);
    const user = await UserModel.findFirst({
      where: { username: req.params.slug },
      include: {
        createdQuest: true,
        Submition: {
          include: {
            theQuest: true,
          },
        },
      },
    });
    return res.render("pages/profile", {
      title: "Profile",
      isAuth: req.user,
      user,
    });
  },
  QuestPage: async (req, res) => {
    const quest = await QuestModel.withSlug(req.params.slug);
    if (!quest) {
      return res.render("pages/notfound", { title: "Oops", isAuth: req.user });
    } else {
      return res.render("pages/thequest", {
        title: "Quest",
        isAuth: req.user,
        quest,
      });
    }
  },
  QuestsPage: async (req, res) => {
    const quests = await QuestModel.all();
    return res.render("pages/quest", {
      title: "Quests",
      isAuth: req.user,
      quests,
    });
  },
  CreateQuestPage: (req, res) => {
    return res.render("pages/createQuest", {
      title: "Create Quest",
      isAuth: req.user,
      command: "create",
    });
  },
  UpdateQuestPage: async (req, res) => {
    const quest = await QuestModel.withSlug(req.params.slug);
    if (quest == null) {
      return res.render("pages/notfound");
    }

    return res.render("pages/createQuest", {
      title: "Update Quest",
      isAuth: req.user,
      old: quest,
      command: "update/" + req.params.slug,
    });
  },
  judgePage: async (req, res) => {
    const data = await submition.findFirst({
      where: {
        theQuest: {
          slug: req.params.slug,
        },
        createdBy: {
          username: req.params.author,
        },
      },
      include: {
        theQuest: {
          include: {
            createdBy: true,
          },
        },
        createdBy: true,
        theFile: true,
        Judge: true,
      },
    });
    res.render("pages/submition", {
      slug: req.params.slug,
      author: req.params.author,
      data,
      judge: data.Judge[0],
      isAuth: req.user,
    });
  },
  submitionPage: (req, res) => {
    return res.render("pages/createSubmition", {
      slug: req.params.slug,
    });
  },
  leaderBoardPage: (req, res) => {
    return res.render("pages/leaderboard");
  },
  NotfoundPage: (req, res) => {
    return res.render("pages/notfound", { title: "Oops", isAuth: req.user });
  },
};

module.exports = Controller;
