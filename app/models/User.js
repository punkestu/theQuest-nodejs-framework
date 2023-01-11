const { user } = require("../../prisma/db");

const model = {
  ...user,
  all: () => {
    return user.findMany();
  },
  withUsername: (username) => {
    return user.findFirst({
      where: { username },
    });
  },
  withEmail: (email) => {
    return user.findFirst({
      where: { email },
    });
  }
};

module.exports = model;
