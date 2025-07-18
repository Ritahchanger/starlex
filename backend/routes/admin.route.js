const AdminController = require("../controllers/admin.controller");

const Router = require("express").Router()


const asyncWrapper = require("../middleware/asyncWrapper");


Router.post("/signup", asyncWrapper(AdminController.signup));

Router.post("/login", asyncWrapper(AdminController.login));

Router.post("/logout", asyncWrapper(AdminController.logout));

module.exports = Router

