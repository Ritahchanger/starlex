const AdminController = require("../controllers/admin.controller");


const Router = require("express").Router();


const asyncWrapper = require("../middleware/asyncWrapper");




Router.get("/me", asyncWrapper(AdminController.getMe));

Router.post("/", asyncWrapper(AdminController.getAllAdmins));

module.exports = Router;
