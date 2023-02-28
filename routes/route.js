const express = require("express");
const newRouter = express.Router();
const userController = require("../controller/controllers");

newRouter.get("/",function(req,res){
    res.redirect("/loginuser");
})

newRouter.get("/registeruser",function(req,res){
    res.render("signup");
})

newRouter.post("/registeruser",userController.registerUser);

newRouter.get("/loginuser",function(req,res){
    res.render("login")
})
newRouter.post("/loginuser",userController.loginUser);

newRouter.get("/home",function(req,res){
    res.render("home")
})
module.exports = newRouter;