let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UrlPathSchema = new Schema(
  {
    url: { type: String, required: true },
    shortPath: { type: String, max: 4, unique: true },
  },
  { timestamp: true }
);

let UrlPath = mongoose.model("UrlPath", UrlPathSchema);

module.exports = UrlPath;
