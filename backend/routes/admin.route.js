const AdminController = require("../controllers/admin.controller");

const Router = require("express").Router();

const asyncWrapper = require("../middleware/asyncWrapper");

Router.get("/me", asyncWrapper(AdminController.getMe));

Router.get("/", asyncWrapper(AdminController.getAllAdmins));

Router.delete("/:id", asyncWrapper(AdminController.deleteAdmin));

module.exports = Router;
