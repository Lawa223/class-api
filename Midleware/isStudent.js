const Student = require("../Model/Academic/Student");
const Admin = require ("../Model/Staff/Admin");

const isStudent = async (req, res, next)=>{
 //Find the user
 const userId = req?.userAuth?._id
 const studentFound = await Student.findById(userId)
 //Check if Student
 if(studentFound?.role === "student"){
    next();
 }else{
    next(new Error("Access denied, Students only"));
 }
};

module.exports = isStudent;