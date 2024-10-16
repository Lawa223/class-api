
const express = require("express");




const isAdmin = require("../../Midleware/isAdmin");
const isLogin = require("../../Midleware/isLogin");
const { createAcademicTerm, getAcademicTerms, updateAcademicTerm, deleteAcademicTerm, getAcademicTerm } = require("../../Controller/academics/academicTermCtrls");


const academicTermRouter = express.Router();



academicTermRouter
.route("/")
.post(isLogin,isAdmin, createAcademicTerm)
.get(isLogin,isAdmin, getAcademicTerms);

academicTermRouter
.route("/:id")
.get(isLogin,isAdmin,getAcademicTerm)
.put(isLogin,isAdmin, updateAcademicTerm)
.delete(isLogin,isAdmin, deleteAcademicTerm)


// academicYearRouter.get("/:id",isLogin,isAdmin, getAcademicYear)
// academicYearRouter.put("/:id",isLogin,isAdmin, updateAcademicYear)
// academicYearRouter.delete("/:id",isLogin,isAdmin, deleteAcademicYear)


module.exports = academicTermRouter;