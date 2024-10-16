const express = require ("express");
const isTeacher = require("../../Midleware/isTeacher");
const isTeacherLogin = require("../../Midleware/isTeacherLogin");
const { createQuestion,updateQuestion, getQuestion, getQuestions} = require("../../Controller/academics/questionCtrls");


const quetionsRouter = express.Router();

quetionsRouter.get("/",isTeacher,isTeacherLogin,getQuestions)
quetionsRouter.get("/:id",isTeacher,isTeacherLogin,getQuestion)
quetionsRouter.post("/:examID",isTeacher,isTeacherLogin,createQuestion)
quetionsRouter.put("/:id",isTeacher,isTeacherLogin,updateQuestion)


module.exports = quetionsRouter;