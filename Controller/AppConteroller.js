const mongoose = require("mongoose");
const Data = require("../Model/Models").DbTask;
require("dotenv").config();

module.exports = {
  index: async (req, res) => {
    const userId = req.user.userId;

    try {
      data = await Data.findById({ _id: userId });

      if (data === null) {
        return res
          .status(200)
          .json({ message: "Empty Tasks yet", MyTasks: [] });
      }
      const MyTasks = data?.myTasks;
      return res.status(200).json({ message: "All My Tasks", MyTasks });
    } catch (err) {
      return res.status(400).json({ message: "Error : " + err });
    }

    // data = await Data.find({})
    //   .then((data) => res.json(data[`0`].myTasks))
    //   .catch((error) => {
    //     console.log(error);
    //     res.json(error);
    //   });
  },

  add: async (req, res) => {
    const { title, info, colorbg } = req.body;
    const userId = req.user.userId;

    if (!title || !info || !colorbg) {
      return res.status(400).json({ message: "Bad Req Fill data" });
    }
    const newTasktopush = { title, info, colorbg };

    try {
      const data = await Data.findOneAndUpdate(
        { _id: userId },
        { $push: { myTasks: newTasktopush } },
        { new: true }
      );

      if (!data) {
        await Data.insertOne({
          _id: userId,
          myTasks: newTasktopush,
        });
        return res.status(201).json({
          message: "add item -ok",
          data: await Data.find({}),
        });
      }
      return res.status(201).json({
        message: "add item -ok",
        data: await Data.find({}),
      });
    } catch (err) {
      return res.status(400).json("Bad REQ" + err);
    }
  },
  update: async (req, res) => {
    const { title, info, colorbg } = req.body;
    const userId = req.user.userId;
    const id = req.params._id;
    const newUpdate = { _id: id, title, info, colorbg };

    try {
      const TaskWillUpdate = await Data.updateOne(
        { _id: userId, "myTasks._id": id },
        { $set: { "myTasks.$": newUpdate } }
      );

      if (TaskWillUpdate.matchedCount === 0) {
        return res.status(404).json({ message: "Not Found Task" });
      }
      return res.status(200).json({ message: "Task updated" });
    } catch (err) {
      return res.status(400).json({ message: "Error :" + err });
    }
  },
  delete: async (req, res) => {
    const id = req.params._id;
    const userId = req.user.userId;

    try {
      const TaskWillDelete = await Data.updateOne(
        {
          _id: userId,
        },
        {
          $pull: {
            myTasks: {
              _id: id,
            },
          },
        }
      );

      if (TaskWillDelete.matchedCount === 0) {
        return res.status(404).json({ message: "Not Found Task" });
      }

      MyTasksAfterUpdate = await Data.find({ _id: userId });
      return res
        .status(200)
        .json({ message: "Task Deleted", data: MyTasksAfterUpdate });
    } catch (err) {
      return res.json({ message: "Error :" + err });
    }
  },
};
