const { file } = require("../../prisma/db");

const Controller = {
  uploadSaver: async (req) => {
    if (req.files && req.files.request) {
      req.files.request.mv(
        __dirname + "/../../uploads/" + req.files.request.name,
        (err) => {
          if (err) {
            return err;
          }
        }
      );
      await file.upsert({
        where: {
          fileName: req.files.request.name || "",
        },
        update: {},
        create: {
          fileName: req.files.request.name,
        },
      });
    }
    return "OK";
  },
};

module.exports = Controller;
