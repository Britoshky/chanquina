const express = require("express");
const router = express.Router();



router.get("/index/", async (req, res) => {
  res.render("dashboard/index");
});

router.get("/pages/widgets/", async (req, res) => {
  res.render("dashboard/pages/widgets");
});


module.exports = router;
