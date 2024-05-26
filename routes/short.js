var express = require("express");
var router = express.Router();
var URL = require("../model/urlPaths");
var QRCode = require("qrcode");

router.post("/", (req, res, next) => {
  function uniqueShort() {
    var result = "";
    var maxLen = 5;
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < maxLen; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  req.body.shortPath = uniqueShort();
  req.body.qrCode = "";

  QRCode.toDataURL(
    "https://6c7f2q-3000.csb.app/" + req.body.shortPath,
    (err, url) => {
      req.body.qrCode = url;
      URL.create(req.body, (err, url) => {
        if (err) return next(err);
        req.flash("shortUrl", url.shortPath);
        req.flash("qrCodeImage", url.qrCode);
        res.redirect("/");
      });
    },
  );
});

module.exports = router;
