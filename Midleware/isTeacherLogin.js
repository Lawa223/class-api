// const { log } = require("console");
const verifyToken = require("../utils/verifyToken");
const Teacher = require("../Model/Staff/Teacher");
const Admin = require("../Model/Staff/Admin");
// const isAdmin = require("../Staff/Model/isAdmin")



const isTeacherLogin = async (req, res, next)=>{
 //Get token from the Header
 const headerObj = req.headers;

 const token = headerObj?.authorization?.split(" ")[1];
//  const token = headerObj.authorization && headerObj.authorization.split(" ")[1];

  //Verify Token
 const  verifiedToken = verifyToken(token)

 if(verifiedToken){
//Find the admin
  const teacher = await Teacher.findById(verifiedToken.id).select("name email role")
  //Save the user into req.obj
  req.userAuth = teacher;
  next()
  // return verifiedToken;
 }else{
  const err = new Error("Token expire/Invalid");
  next(err)
 }

 
};

module.exports = isTeacherLogin;