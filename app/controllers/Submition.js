const { submition } = require("../../prisma/db");
const { uploadSaver } = require("./File");

const Controller = {
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
