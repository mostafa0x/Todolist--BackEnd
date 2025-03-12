const express = require("express");
const cors = require("cors");
const app = express();
const Router = require("./Router/Router");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const corsOptions = {
  origin: "http://localhost:3001",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsOptions));

app.use(methodOverride("X-HTTP-Method-Override"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", Router.AuthRouter, Router.TaskRouter);

app.listen(3000, () => console.log("Server Work on 3000 port "));
