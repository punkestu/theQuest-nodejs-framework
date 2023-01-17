const QuestModel = require("../models/Quest");

class Pages {
  static HomePage(req, res) {
    return res.render("pages/index", { title: "Index", isAuth: req.user });
  }
  static LoginPage(_, res) {
    return res.render("pages/login", { title: "Login" });
  }
  static RegisterPage(_, res) {
    return res.render("pages/register", { title: "Register" });
  }
  static ProfilePage(req, res) {
    return res.render("pages/profile", { title: "Profile", isAuth: req.user });
  }
  static async QuestPage(req, res) {
    const quest = await QuestModel.withSlug(req.params.slug);
    return res.render("pages/thequest", {
      title: "Quest",
      isAuth: req.user,
      quest,
    });
  }
  static async QuestsPage(req, res) {
    const quests = await QuestModel.all();
    return res.render("pages/quest", {
      title: "Quests",
      isAuth: req.user,
      quests,
    });
  }
  static CreateQuestPage(req, res) {
    return res.render("pages/createQuest", {
      title: "Create Quest",
      isAuth: req.user,
      command: "create",
    });
  }
  static async UpdateQuestPage(req, res) {
    const quest = await QuestModel.withSlug(req.params.slug);
    if(quest == null){
      return res.render("pages/notfound");
    }

    return res.render("pages/createQuest", {
      title: "Update Quest",
      isAuth: req.user,
      old: quest,
      command: "update/"+req.params.slug,
    });
  }
  static NotfoundPage(req, res) {
    return res.render("pages/notfound", { title: "Oops", isAuth: req.user });
  }
}

module.exports = Pages;
