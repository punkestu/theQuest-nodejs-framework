const UserModel = require("../models/User");
const QuestModel = require("../models/Quest");

class Request {
  static async usernameUnique(username) {
    const user = await UserModel.withUsername(username);
    if (user) {
      throw new Error("Username is used");
    }
  }
  static async emailUnique(email) {
    const user = await UserModel.withEmail(email);
    if (user) {
      throw new Error("Email is used");
    }
  }
  static async usernameGet(username, { req }) {
    const user = await UserModel.withUsername(username);
    if (!user) {
      throw new Error("Username not found");
    } else {
      req.user = user;
    }
  }
  static async passwordVal(password, { req }) {
    if (req.user && req.user.password != password) {
      throw new Error("Password invalid");
    }
  }
  static async questNameCreate(name) {
    if (await QuestModel.nameExist(name)) {
      throw new Error("Use other name please");
    }
  }
}

module.exports = Request;
