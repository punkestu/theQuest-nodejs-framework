const QuestModel = require("../models/Quest");
const UserModel = require("../models/User");

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
  judgePage: (req, res) => {
    const dummy = {
      theQuest: {
        name: "dummy Quest",
        point: 1000,
        createdBy: {
          username: "testUse",
        },
      },
      comment: "# This is comment",
      theFile: {
        fileName: "TestFile.pdf",
      },
    };
    const judge = {
      point: 100,
      comment: "# this is comment from quest author",
      createdAt: "10 January 2023",
    };
    // const judge = null;
    res.render("pages/submition", {
      slug: req.params.slug,
      author: req.params.author,
      data: dummy,
      judge,
      isAuth: { user: "testUser" },
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
