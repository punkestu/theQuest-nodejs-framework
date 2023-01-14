const { quest } = require("../../prisma/db");

const model = {
  ...quest,
  all: () => {
    return quest.findMany({
      include: {
        createdBy: true,
      }
    });
  },
  api: {
    all: ()=>{
      return quest.findMany({
        select: {
          name: true,
          point: true,
          description: true,
          createdAt: true,
          dateline: true,
          createdBy: {
            select: {
              username: true
            }
          }
        }
      });
    }
  }
};

module.exports = model;
