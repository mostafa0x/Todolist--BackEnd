const monges = require("mongoose");

async function CheckDB(req, res, next) {
  DbStats = await monges.connection.readyState;
  console.log(DbStats);

  if (DbStats !== 1) {
    return res.status(500).json({
      message: "Server is not connected. Please try again later.",
    });
  }
  next();
}
module.exports = CheckDB;
