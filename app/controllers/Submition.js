const { submition } = require("../../prisma/db");
const { judge } = require("../../prisma/db");
const { uploadSaver } = require("./File");

const Controller = {
  judgeSubmition: async (req, res) => {
    const _submition = await submition.findFirst({
      where: {
        theQuest: {
          slug: req.params.slug,
        },
        createdBy: {
          username: req.params.author,
        },
      },
    });

    if (_submition) {
      await judge.create({
        data: {
          submitionId: _submition.id,
          comment: req.body.comment,
          point: parseInt(req.body.point),
        },
      });
      return res.redirect("/");
    }else{
      return res.render("pages/notfound", { title: "Oops", isAuth: req.user });
    }
  },
  submitQuest: async (req, res) => {
    if (req.files && req.files.request) {
      await uploadSaver(req);
      await submition.create({
        data: {
          comment: req.body.comment,
          theFile: {
            connect: {
              fileName: req.files.request.name,
            },
          },
          createdBy: {
            connect: {
              username: req.user.user,
            },
          },
          theQuest: {
            connect: {
              slug: req.params.slug,
            },
          },
        },
      });
    } else {
      await submition.create({
        data: {
          comment: req.body.comment,
          createdBy: {
            connect: {
              username: req.user.user,
            },
          },
          theQuest: {
            connect: {
              slug: req.params.slug,
            },
          },
        },
      });
    }

    return res.redirect("/profile/" + req.user.user);
  },
};

module.exports = Controller;
