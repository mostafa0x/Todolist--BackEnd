const express = require("express");
const cors = require("cors");
const app = express();
const Router = require("./Router/Router");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const port = process.env.PORT || 8080;
const corsOptions = {
  origin: "https://taskmanger-umber.vercel.app",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsOptions));

app.use(methodOverride("X-HTTP-Method-Override"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", Router.AuthRouter, Router.TaskRouter);

app.listen(port, () => console.log(`Server Work on ${port} port`));
