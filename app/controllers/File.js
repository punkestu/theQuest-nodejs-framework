const Controller = {
  uploadSaver: (req, res) => {
    if (!req.files.request) {
      return res.sendStatus(400);
    }
    req.files.request.mv(
      __dirname + "/../../uploads/" + req.files.request.name,
      (err) => {
        console.log("error");
        console.log(err);
      }
    );
    return res.sendStatus(200);
  },
};

module.exports = Controller;
