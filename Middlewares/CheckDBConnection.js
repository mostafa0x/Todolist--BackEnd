const monges = require("mongoose");
const { DbTask } = require("../Model/Models");

async function CheckDB(req, res, next) {
  DbStats = await monges.connection.readyState;
  
  if (DbTask !== 1) {
    return res.status(500).json({
      message: "Server is not connected. Please try again later.",
    });
  }
  next();
}
module.exports = CheckDB;
