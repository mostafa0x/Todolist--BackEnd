const mongoose = require("mongoose");

function CheckDB(req, res, next) {
  if (mongoose.connection.readyState === (0 || 4)) {
    return res.status(500).json({
      message: "Server is not connected. Please try again later.",
    });
  }
  next();
}
module.exports = CheckDB;
