
const express = require("express");
const isAdmin = require("../../Midleware/isAdmin");
const isLogin = require("../../Midleware/isLogin");



const {  getPrograms, getProgram, updateProgram, deletePrograms, programCreated } = require("../../Controller/academics/programs");

const programRouter = express.Router();



programRouter
.route("/")
.post(isLogin,isAdmin, programCreated)
.get(isLogin,isAdmin, getPrograms);

programRouter
.route("/:id")
.get(isLogin,isAdmin, getProgram)
.put(isLogin,isAdmin, updateProgram)
.delete(isLogin,isAdmin, deletePrograms)





module.exports = programRouter;