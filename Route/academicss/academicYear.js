
const express = require("express");
const isAdmin = require("../../Midleware/isAdmin");
const isLogin = require("../../Midleware/isLogin");



const {
    createAcademicYear,
    getAcademicYears,
    getAcademicYear,
    updateAcademicYear,
    deleteAcademicYear,
} = require("../../Controller/academics/academicYearCtrl");


const academicYearRouter = express.Router();



academicYearRouter
.route("/")
.post(isLogin,isAdmin, createAcademicYear)
.get(isLogin,isAdmin, getAcademicYears);

academicYearRouter
.route("/:id")
.get(isLogin,isAdmin, getAcademicYear)
.put(isLogin,isAdmin, updateAcademicYear)
.delete(isLogin,isAdmin, deleteAcademicYear)


// academicYearRouter.get("/:id",isLogin,isAdmin, getAcademicYear)
// academicYearRouter.put("/:id",isLogin,isAdmin, updateAcademicYear)
// academicYearRouter.delete("/:id",isLogin,isAdmin, deleteAcademicYear)


module.exports = academicYearRouter;