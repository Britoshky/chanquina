const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const MySQLStore = require("express-mysql-session");
const { database } = require("./keys");
const passport = require("passport");




// initializations
const app = express();
require("./lib/passport");
// settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars"),
  })
);
app.set("view engine", ".hbs");
// middlewares
app.use(
  session({
    secret: "mysecretapp",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database),
  }));
  
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
// Global variables
app.use((req, res, next) => {
  app.locals.success = req.flash("success");
  app.locals.message = req.flash("message");
  app.locals.message = req.flash("error");
  app.locals.user = req.user;
  next();
});
// static files
app.use(express.static(path.join(__dirname, "/public/")));
// Routes
app.use(require("./routes"));
app.use(require("./routes/authentication"));
app.use("/links", require("./routes/links"));
app.use("/noticias", require("./routes/noticias"));
app.use(require("./routes/pages"));



// Starting the server
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});

