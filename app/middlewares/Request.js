const { body } = require("express-validator");
const fileUpload = require("express-fileupload");

const UserModel = require("../models/User");
const QuestModel = require("../models/Quest");
const slugify = require("slugify");

const middlewares = {
  usernameUnique: async (username) => {
    const user = await UserModel.withUsername(username);
    if (user) {
      throw new Error("Username is used");
    }
  },
  emailUnique: async (email) => {
    const user = await UserModel.withEmail(email);
    if (user) {
      throw new Error("Email is used");
    }
  },
  usernameGet: async (username, { req }) => {
    const user = await UserModel.withUsername(username);
    if (!user) {
      throw new Error("Username not found");
    } else {
      req.user = user;
    }
  },
  passwordVal: async (password, { req }) => {
    if (req.user && req.user.password != password) {
      throw new Error("Password invalid");
    }
  },
  questNameUpdate: async (name, { req }) => {
    const nslug = slugify(name, { remove: /[*+~.()'"!:@]/g });
    if (nslug != req.params.slug) {
      if (await QuestModel.nameExist(name)) {
        throw new Error("Use other name please");
      }
    }
  },
  questNameCreate: async (name, { req }) => {
    if (await QuestModel.nameExist(name)) {
      throw new Error("Use other name please");
    }
  },
};

const Request = {
  postLogin: [
    body("username").custom(middlewares.usernameGet),
    body("password").custom(middlewares.passwordVal),
  ],
  postRegister: [
    body("username")
      .trim()
      .not()
      .isEmpty()
      .withMessage("You need username")
      .custom(middlewares.usernameUnique),
    body("email")
      .trim()
      .not()
      .isEmpty()
      .withMessage("You need email")
      .isEmail()
      .withMessage("It is not an email")
      .custom(middlewares.emailUnique),
    body("password")
      .trim()
      .not()
      .isEmpty()
      .withMessage("You need password")
      .isLength({ min: 8, max: 12 })
      .withMessage("8 - 12 characters please"),
  ],
  postQuestCreate: [
    body("name")
      .not()
      .isEmpty()
      .withMessage("Set the name please")
      .custom(middlewares.questNameCreate),
    body("point").not().isEmpty().withMessage("You need a point for quest"),
  ],
  postQuestUpdate: [
    body("name")
      .not()
      .isEmpty()
      .withMessage("Set the name please")
      .custom(middlewares.questNameUpdate),
    body("point").not().isEmpty().withMessage("You need a point for quest"),
  ],
  postSubmit: [
    fileUpload({
      createParentPath: true,
    }),
  ],
};

module.exports = Request;
