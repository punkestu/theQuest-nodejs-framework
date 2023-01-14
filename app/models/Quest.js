const { quest } = require("../../prisma/db");

const model = {
  ...quest,
  all: () => {
    return quest.findMany({
      include: {
        createdBy: true,
      },
    });
  },
};

module.exports = model;
