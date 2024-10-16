
const express = require("express");

const isAdmin = require("../../Midleware/isAdmin");
const isLogin = require("../../Midleware/isLogin");


const { createClassLevel,deleteClassLevel,getClassLevel,getClassLevels,updateClassLevel } = require("../../Controller/academics/classLevel");

const classLevelRouter = express.Router();



classLevelRouter
.route("/")
.post(isLogin,isAdmin, createClassLevel)
.get(isLogin,isAdmin, getClassLevels);

classLevelRouter
.route("/:id")
.get(isLogin,isAdmin, getClassLevel)
.put(isLogin,isAdmin, updateClassLevel)
.delete(isLogin,isAdmin, deleteClassLevel)




module.exports = classLevelRouter;