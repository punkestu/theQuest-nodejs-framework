const express = require("express");
const dotenv = require("dotenv");

const bodyParser = require("body-parser");
const { engine } = require("express-handlebars");
const cookieParser = require("cookie-parser");

const WebRoute = require("./routes/web");
const ApiRoute = require("./routes/api");

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/",
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use("/public", express.static("public"));
app.use("/api", ApiRoute);
app.use("/", WebRoute);

app.listen(3000, () => {
  console.log("listening at http://localhost:3000");
});
