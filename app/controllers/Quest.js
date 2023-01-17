const QuestModel = require("../models/Quest");
const { validationResult } = require("express-validator");
const slugify = require("slugify");

const Quest = {
  QuestCreate: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("pages/createQuest", {
        title: "Create Quest",
        old: req.body,
        errors: errors.mapped(),
        isAuth: req.user,
      });
    }

    await QuestModel.create({
      data: {
        name: req.body.name,
        slug: slugify(req.body.name, { remove: /[*+~.()'"!:@]/g }),
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
  QuestDelete: async (req, res) => {
    const quest = await QuestModel.withSlug(req.params.slug);
    if (quest.createdBy.username !== req.user.user) {
      return res.render("pages/forbiden", {
        title: "Forbidden",
        isAuth: req.user,
      });
    }

    await QuestModel.delete.withSlug(req.params.slug);
    return res.redirect("/quest");
  },
};

module.exports = Quest;
