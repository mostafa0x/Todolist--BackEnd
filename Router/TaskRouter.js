const TaskRouter = require("express").Router();
const AppConteroller = require("../Controller/AppConteroller");
const AuthMiddleware = require("../Middlewares/authMiddleware");
const CheckDBMiddleware = require("../Middlewares/CheckDBConnection");

TaskRouter.get(
  "/tasks",
  CheckDBMiddleware,
  AuthMiddleware,
  AppConteroller.index
);

TaskRouter.post(
  "/task/add",
  CheckDBMiddleware,
  AuthMiddleware,
  AppConteroller.add
);

TaskRouter.put(
  "/task/:_id",
  CheckDBMiddleware,
  AuthMiddleware,
  AppConteroller.update
);

TaskRouter.delete(
  "/task/:_id",
  CheckDBMiddleware,
  AuthMiddleware,
  AppConteroller.delete
);

module.exports = TaskRouter;
