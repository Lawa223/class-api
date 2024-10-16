const express = require("express");
const { adminRegisterTeacher, loginTeacher, getAllTeachersAdmin,getTeacherByAdmin,getTeacherProfile,teacherUpdateProfile, adminUpdateTeacher } = require("../../Controller/staff/teachersCtrl");
const isLogin = require("../../Midleware/isLogin");
// const isAdmin = require("../../Midleware/isAdmin");
const isTeacherLogin = require("../../Midleware/isTeacherLogin");
const isTeacher = require("../../Midleware/isTeacher");
const Teacher = require("../../Model/Staff/Teacher");
const isAdmin = require("../../Midleware/isAdmin");
const advancedResults = require("../../Midleware/advancedResults");

const teachersRouter = express.Router();

teachersRouter.post("/admin/register",isLogin,isAdmin, adminRegisterTeacher);
teachersRouter.post('/login', loginTeacher);

teachersRouter.get('/admin',isLogin,isAdmin,advancedResults(Teacher, {
    path: "examsCreated",
    populate: {
        path: "Questions",
    }
}), getAllTeachersAdmin);

teachersRouter.get('/admin/:teacherID/',isLogin,isAdmin, getTeacherByAdmin);
teachersRouter.get('/profile',isTeacherLogin,isTeacher, getTeacherProfile);
teachersRouter.put('/:teacherID/update',isTeacherLogin,isTeacher, teacherUpdateProfile);
teachersRouter.put('/:teacherID/update/admin',isLogin,isAdmin, adminUpdateTeacher)


module.exports = teachersRouter;