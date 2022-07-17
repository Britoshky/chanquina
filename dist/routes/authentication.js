const express = require("express");
const router = express.Router();
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("../lib/auth");

router.get("/signup", isNotLoggedIn, (req, res) => {
  res.render("auth/signup");
});

router.post(
  "/signup",
  isNotLoggedIn,
  passport.authenticate("local.signup", {
    successRedirect: "/dashboard",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);

router.get("/signin", isNotLoggedIn, (req, res) => {
  res.render("auth/signin");
});

router.post("/signin", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local.signin", {
    successRedirect: "/dashboard",
    failureRedirect: "/signin",
    failureFlash: true,
  })(req, res, next);
});

router.get("/dashboard", isLoggedIn, (req, res) => {
  res.render("dashboard/index");
});

router.get("/logout", isLoggedIn, function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/signin");
  });
});
module.exports = router;
