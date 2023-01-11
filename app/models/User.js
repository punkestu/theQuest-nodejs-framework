const prisma = require("../../prisma/db");

class UserModel {
  static async all() {
    return await prisma.user.findMany();
  }
  static async withUsername(username) {
    return await prisma.user.findFirst({
      where: { username },
    });
  }
  static async withEmail(email) {
    return await prisma.user.findFirst({
      where: { email },
    });
  }
}

module.exports = UserModel;
