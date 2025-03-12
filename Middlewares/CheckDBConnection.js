const monges = require("mongoose");

async function CheckDB(req, res, next) {
  if (monges.connection.readyState !== 1) {
    return res.status(500).json({
      message:
        "Server is not connected. Please try again later." +
        monges.Error.Messages,
    });
  }
  next();
}
module.exports = CheckDB;
