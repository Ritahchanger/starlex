const AuthController = require("../controllers/auth.controller");


const Router = require("express").Router();


const asyncWrapper = require("../middleware/asyncWrapper");


Router.post("/signup", asyncWrapper(AuthController.signup));


Router.post("/login", asyncWrapper(AuthController.login));


Router.post("/logout", asyncWrapper(AuthController.logout));



module.exports = Router;