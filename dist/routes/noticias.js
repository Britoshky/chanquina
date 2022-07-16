const express = require("express");

const multer = require("multer");

const path = require("path");

const router = express.Router();

const {
  v4: uuid
} = require("uuid");

const pool = require("../database");

const {
  isLoggedIn
} = require("../lib/auth");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/img_noticiasPrincipales"),
  filename: (req, file, cb) => {
    cb(null, uuid() + path.extname(file.originalname).toLocaleLowerCase());
  }
});
router.get("/", isLoggedIn, async (req, res) => {
  const noticiasPrincipales = await pool.query("SELECT * FROM noticiasPrincipales");
  res.render("noticias/list", {
    noticiasPrincipales
  });
});
router.get("/add", isLoggedIn, (req, res) => {
  res.render("noticias/add");
});
const upload = multer({
  storage,
  dest: path.join(__dirname, "../public/img_noticiasPrincipales"),
  limits: {
    fileSize: 100000000
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Archivo no permitido");
    }
  }
}).single("image");
router.post("/add", isLoggedIn, async (req, res) => {
  upload(req, res, async err => {
    if (err) {
      console.log(err);
      req.flash("message", "El archivo no es permitido");
      res.redirect("/noticias/add");
    } else {
      const {
        title,
        description
      } = req.body;
      const image = req.file.filename;
      const newNoticia = {
        title,
        description,
        image
      };
      await pool.query("INSERT INTO noticiasPrincipales SET ?", [newNoticia]);
      req.flash("success", "Noticia agregada correctamente");
      res.redirect("/noticias");
    }
  });
}); // router.post("/add", upload.single('image'), isLoggedIn, async (req, res) => {
//   const { title,  description, image} = req.body;
//   const newNotice = {
//     title,
//     description,
//     image
//   };
//   console.log(newNotice);
//   res.redirect("/noticias");
// });

module.exports = router;