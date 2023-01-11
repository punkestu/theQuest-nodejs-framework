const prisma = require("../../prisma/db");

class TokenModel {
  static async all() {
    return await prisma.token.findMany();
  }
  static async withUsername(username) {
    return await prisma.token.findFirst({
      where: { username },
    });
  }
  static async login(token, username) {
    return await prisma.token.create({
      data: {
        id: token,
        username,
      },
    });
  }
  static async exists(token) {
    const data = await prisma.token.findFirst({
      where: { id: token },
    });
    return data != null;
  }
  static async logout(token) {
    return await prisma.token.delete({
      where: { id: token },
    });
  }
}

module.exports = TokenModel;
