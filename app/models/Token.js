const { token } = require("../../prisma/db");

const model = {
  ...token,
  all: () => {
    return token.findMany();
  },
  withUsername: (username) => {
    return token.findFirst({
      where: { username },
    });
  },
  login: (_token, username) => {
    return token.create({
      data: {
        id: _token,
        username,
      },
    });
  },
  exists: async (_token) => {
    const data = await token
      .findFirst({
        where: { id: _token },
      });
    return data != null;
  },
  logout: (_token) => {
    return token.delete({
      where: { id: _token },
    });
  },
};

module.exports = model;
