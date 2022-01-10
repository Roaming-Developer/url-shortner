var express = require("express");
var router = express.Router();
var URL = require("../model/urlPaths");

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
  URL.create(req.body, (err, url) => {
    if (err) return next(err);
    console.log(url + " created");
    req.flash("shortUrl", url.shortPath);
    res.redirect("/");
  });
});

module.exports = router;
