const express = require("express");
const app = require("../../app/app")
const Admin = require("../../Model/Staff/Admin");

const {adminSuspendTeacherCtrl,adminWithdrawTeacherCtrl,getAdminProfileCtrl,loginAdminCtrl,getAdminCtrl, updateAdmCtrl, deleteAdmCtrl, adminUnsuspendTeacherCtrl, adminUnwithdrawTeacherCtrl, adminPublishResultCtrl, adminUnpublishResultCtrl, registerAdminCtrl, getAllAdmin} = require("../../Controller/staff/adminCtrl")


const isLogin = require ("../../Midleware/isLogin");
const isAdmin = require("../../Midleware/isAdmin");
const isAuthenticated = require("../../Midleware/isAuthenticated");
const roleRestriction = require("../../Midleware/roleRestriction");
// const { registerAdmCtrl } = require("../../Controller/staff/adminCtrl");



const adminRouter = express.Router();



//Register
adminRouter.post("/register", registerAdminCtrl);

     ///login
  adminRouter.post("/login", loginAdminCtrl);

  //get all
  adminRouter.get("/",isLogin,isAdmin, getAllAdmin);

     //get single
     adminRouter.get("/profile",isAuthenticated(Admin),roleRestriction("admin"), getAdminProfileCtrl);

  //update admin
  adminRouter.put("/",isLogin,roleRestriction(Admin), updateAdmCtrl);

  //delete admin

  adminRouter.delete("/:id", deleteAdmCtrl);

  //Suspend Teacher
    adminRouter.put("/suspend/teacher/:id", adminSuspendTeacherCtrl);

      //Unsuspend Teacher
      adminRouter.put("/unsuspend/teacher:id", adminUnsuspendTeacherCtrl);

      //Withdraw
      adminRouter.put("/withdraw/teacher:id", adminWithdrawTeacherCtrl);

      //Unwithdraw
      adminRouter.put("/unwithdraw/teacher:id", adminUnwithdrawTeacherCtrl);

      //publish exams
      adminRouter.put("/publish/exam:id", adminPublishResultCtrl);

      // Unpublish exams
      adminRouter.put("/unpublish/exam:id",  adminUnpublishResultCtrl);
  

  module.exports = adminRouter;