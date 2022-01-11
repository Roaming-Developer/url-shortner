var express = require("express");
var router = express.Router();
var URL = require("../model/urlPaths");

/* GET home page. */
router.get("/", function (req, res, next) {
  var shortUrl = req.flash("shortUrl")[0];
  var qrCodeImage = req.flash("qrCodeImage")[0];
  res.render("index", { shortUrl, qrCodeImage });
});

router.get("/:id/qr", (req, res, next) => {
  var uniqueShort = req.params.id;
  URL.findOne({ shortPath: uniqueShort }, (err, urldoc) => {
    if (err) return next(err);
    if (!urldoc) {
      res.send("ID Doesn't Exist");
    } else {
      var originalUrl = urldoc.url;
      var shortUrl = urldoc.shortPath;
      var qrCodeImage = urldoc.qrCode;
      console.log(shortUrl);
      res.render("details", { originalUrl, shortUrl, qrCodeImage });
    }
  });
});

router.get("/:id", (req, res, next) => {
  var uniqueShort = req.params.id;
  URL.findOne({ shortPath: uniqueShort }, (err, urldoc) => {
    if (err) return next(err);
    if (!urldoc) {
      res.send("ID Doesn't Exist");
    } else {
      res.redirect(urldoc.url);
    }
  });
});

module.exports = router;
