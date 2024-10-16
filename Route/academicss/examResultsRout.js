const express = require("express");
// const {checkExamResults,getAllExamResults,adminToggleExamResults} = require("../../Controller/academics/examResults");
const isStudent = require("../../Midleware/isStudent");
const isStudentLogin = require("../../Midleware/isStudentLogin ");
const isAdmin = require("../../Midleware/isAdmin");
const isLogin = require("../../Midleware/isLogin");
const { getAllExamResults, checkExamResults, adminToggleExamResults } = require("../../Controller/academics/examResults");


const examResultRouter = express.Router();

examResultRouter.get('/',isStudent,isStudentLogin, getAllExamResults);
examResultRouter.get('/:id checking',isStudent,isStudentLogin, checkExamResults);
examResultRouter.put('/:id/admin-toggle-publish',isLogin,isAdmin, adminToggleExamResults);

module.exports = examResultRouter;