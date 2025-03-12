const mongoose = require("mongoose");

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
  .connect(
    "mongodb+srv://dodomido12350:jDxDKXKUQUSy4kFo@cluster0.xjii3.mongodb.net/TestApi"
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error Connection : " + err);
  });

module.exports = { DbTask, DbUsers };
