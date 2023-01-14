const QuestModel = require("../models/Quest");
const { validationResult } = require("express-validator");

const Quest = {
  QuestCreate: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("pages/createQuest", {
        title: "Create Quest",
        old: req.body,
        errors: errors.mapped(),
        isAuth: req.user
      });
    }

    await QuestModel.create({
      data: {
        name: req.body.name,
        point: parseInt(req.body.point),
        description: req.body.description,
        dateline: new Date(req.body.dl),
        createdBy: {
          connect: {
            username: req.user.user,
          },
        },
      },
    });
    return res.redirect("/quest");
  },
};

module.exports = Quest;
