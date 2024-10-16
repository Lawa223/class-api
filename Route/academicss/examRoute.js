const express = require("express");
const isTeacher = require("../../Midleware/isTeacher");
const isTeacherLogin = require("../../Midleware/isTeacherLogin");
const { createExam, getExams,getExam,updateExam, } = require("../../Controller/academics/examsCtrl")

const examRouter = express.Router();

examRouter
.route("/")
.post(isTeacherLogin,isTeacher,createExam)
.get(isTeacherLogin,isTeacher,getExams)

examRouter
.route("/:id")
.get(isTeacherLogin,isTeacher,getExam)
.put(isTeacherLogin,isTeacher,updateExam)

module.exports = examRouter;