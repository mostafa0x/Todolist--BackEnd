const mongoose = require("mongoose");
require("dotenv").config();

const urldb = process.env.MONGODB_URI;

const UsersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const DbSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
  colorbg: {
    type: String,
    required: true,
  },
});

const TaskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  myTasks: [DbSchema],
});

const DbTask = mongoose.model("data", TaskSchema); // تاني برمتر هوا الاسكيما نفهم بقاااااا
const DbUsers = mongoose.model("users", UsersSchema); // تاني برمتر هوا الاسكيما نفهم بقااا

mongoose
  .connect(urldb)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error Connection : " + err);
  });

module.exports = { DbTask, DbUsers };
