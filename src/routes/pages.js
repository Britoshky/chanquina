const express = require("express");
const router = express.Router();



router.get("/widgets/", async (req, res) => {
  res.render("dashboard/index");
});

router.get("/pages/widgets/", async (req, res) => {
  res.render("pages/widgets");
});


module.exports = router;
