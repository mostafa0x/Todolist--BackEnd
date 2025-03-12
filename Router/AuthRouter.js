const AuthRouter = require("express").Router();
const LoginConteroller = require("../Controller/LoginConteroller");
const CheckDBMiddleware = require("../Middlewares/CheckDBConnection");

AuthRouter.post("/login", CheckDBMiddleware, LoginConteroller.Login);

AuthRouter.post("/signin", CheckDBMiddleware, LoginConteroller.signin);

module.exports = AuthRouter;
