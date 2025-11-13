const express = require("express");
const {
  createUser,
  handleLogin,
  getUser,
  getAccount,
  handleForgotPassword,
  handleResetPassword,
} = require("../controllers/userController");

const auth = require("../middleware/auth");
const delay = require("../middleware/delay");

const routerAPI = express.Router();

routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);
routerAPI.post("/forgot-password", handleForgotPassword);
routerAPI.post("/reset-password", handleResetPassword);

routerAPI.get("/", (req, res) => {
  return res.status(200).json("Lục Thới Trọng - 22110254");
});

routerAPI.use(auth);

routerAPI.get("/user", getUser);
routerAPI.get("/account", delay, getAccount);

module.exports = routerAPI;