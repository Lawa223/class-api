const express = require("express");

const isLogin = require("../../Midleware/isLogin");
const isAdmin = require("../../Midleware/isAdmin");
const { adminRegisterStudent,loginStudent,getStudentProfile,getAllStudentsByAdmin,getStudentByAdmin,studentUpdateprofile,adminUpdateStudent, writeExam } = require("../../Controller/students/studentsCtrl");
const isStudent = require("../../Midleware/isStudent");
const isStudentLogin = require("../../Midleware/isStudentLogin ");
const isAuthenticated = require("../../Midleware/isAuthenticated");
const Student = require("../../Model/Academic/Student");
const roleRestriction = require("../../Midleware/roleRestriction");
const Admin = require("../../Model/Staff/Admin");


const studentRouter = express.Router();

studentRouter.post("/admin/register",isLogin,isAdmin, adminRegisterStudent);
studentRouter.post("/login",loginStudent);
studentRouter.post("profile",isAuthenticated(Student),roleRestriction("student"),getStudentProfile);
studentRouter.post("admin",isAuthenticated(Admin),roleRestriction("admin"),getAllStudentsByAdmin);
studentRouter.post("/:studentID/admin",isAuthenticated(Student),roleRestriction("admin"),getStudentByAdmin);
studentRouter.post("/exam/:examID/write",isAuthenticated(Student), roleRestriction("student"),writeExam);
studentRouter.put("/:studentID/update/admin",isAuthenticated(Admin),roleRestriction("admin"),adminUpdateStudent);

studentRouter.put("/update",roleRestriction("student"),isAuthenticated(Student),studentUpdateprofile);
studentRouter.post("profile",isAuthenticated(Student),isStudent,getStudentProfile);




module.exports = studentRouter;