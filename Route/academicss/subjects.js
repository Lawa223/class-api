
const express = require("express");
const isAdmin = require("../../Midleware/isAdmin");
const isLogin = require("../../Midleware/isLogin");



const { createdSubjects,deleteSubject,updatesubjects,getSubject,getSubjects, } = require("../../Controller/academics/Subjects");

const subjectRouter = express.Router();



subjectRouter.post("/:programID",isLogin,isAdmin, createdSubjects);

subjectRouter.get("/",isLogin,isAdmin, getSubjects);

subjectRouter.get("/:id",isLogin,isAdmin, getSubject);

subjectRouter.put("/:id",isLogin,isAdmin, updatesubjects);

subjectRouter.delete("/:id",isLogin,isAdmin, deleteSubject);


// subjectRouter
// .route("/")
// .post(isLogin,isAdmin, createdSubjects)
// .get(isLogin,isAdmin, getPrograms);

// subjectRouter
// .route("/:id")
// .get(isLogin,isAdmin, getProgram)
// .put(isLogin,isAdmin, updateProgram)
// .delete(isLogin,isAdmin, deletePrograms)






module.exports = subjectRouter;