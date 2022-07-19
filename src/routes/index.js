const express = require("express");
const router = express.Router();
const {Howl, Howler} = require('howler');


router.get("/", async (req, res) => {
  res.render("index", { title: "Express" });
});

router.post("/btn-player", async (req, res) => {
  const sound = new Howl({
    src: ['http://audio.streaminghd.cl:9134/stream'],
    autoplay: true,
    html5: true,
    loop: true,
    volume: 0.5,
});
  sound.play();
});

module.exports = router;
