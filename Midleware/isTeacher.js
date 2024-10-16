const Admin = require ("../Model/Staff/Admin");
const Teacher = require("../Model/Staff/Teacher");


const isTeacher = async (req, res, next)=>{
 //Find the user
 const userId = req?.userAuth?._id
 const teacherFound = await Teacher.findById(userId)
 //Check if Admin 
 if(teacherFound?.role === "teacher"){
    next();
 }else{
    next(new Error("Access denied, Teachers only"));
 }
};

module.exports = isTeacher;