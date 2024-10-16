    const AsyncHandler = require("express-async-handler")
    const bcrypt = require("bcryptjs") 
    const generateToken = require("../../utils/generateToken");
    const verifyToken = require("../../utils/verifyToken");
    const { hashPassword, isPassMatched } = require("../../utils/helpers");
    const Admin = require("../../Model/Staff/Admin");

// const academicTerms = require("../../Model/Academic/academicTerms");
  
 
 ///@description Register Admin
 //@ rout POST /api/admins/register
 //@ acess Private

  exports.registerAdminCtrl = AsyncHandler( async(req, res) => {

    const {name,email,password} = req.body;
     
       //Check if email exist
       const adminFound = await Admin.findOne({email});
       if(adminFound){
         throw new Error("Admin Exists")
       }
       

      //  //register
       const user = await Admin.create({
         name,
         email,
         password: await hashPassword(password)
       });
       res.status(201).json({
           status: "Success",
           message: "Admin register Successfully",
           data: user,
       });
      
     });
    
    
   
 


           ///@description login Admin
 //@ rout POST /api/admins/login
 //@ acess Private

  exports.loginAdminCtrl = AsyncHandler(async (req, res)=>{
    const {email,password} = req.body;
    
      //find user
      const user = await Admin.findOne({email});     
    
      
      if(!user){
        return res.json({message: "invalid login credentials"});
      }
      //Verify password
      const isMatched = await isPassMatched(password, user?.password);
      if(!isMatched){
        return res.json({message: "invalid password login credentials"});
      }else{
        
        res.status(200).json({
         status : "success",
          message: "Admin Login successfully",
          token: generateToken(user?._id),
          data: user
        });
      }
    });


 ///@description Get Single Admin
 //@ rout POST /api/admins/All admin
 //@ acess Private

        
    exports.getAdminProfileCtrl =  AsyncHandler( async(req, res)=>{
      // console.log(req.userAuth);
      const admin = await Admin.findById(req.userAuth._id).select("-password -createdAt -updateadAt")
      .populate("academicYears")
      .populate("academicTerms")
      .populate("programs")
      .populate("yearGroups")
      .populate("classLevel")
      .populate("students")
       populate("teachers")
      
      if(!admin){
        throw new Error("Admin Not Found")
      }else{
        res.status(200).json({
          status: "Success",
          data: admin,
          message: "Admin profile fetched Successfully",
        })
      }
    });

  ///@description Get single Admin
 //@ rout Get /api/adminID/admin
 //@ acess Private Admin only

 exports.getAllAdmin = AsyncHandler(async(req,res) =>{
    
    //find the admin
    const admin = await Admin.find()
 
    res.status(200).json({
        status: "success",
        message: "Admin fetched  successfully",
        data: admin,
    });
});


   ///@description Get update Admin
 //@ rout POST /api/v1/admin:id
 //@ acess Private

 exports.updateAdmCtrl =  AsyncHandler( async(req, res)=>{
  const {email, name, password} = req.body

   //if email is taken
   const emailExist = await Admin.findOne({email});
   if(emailExist){
    throw new Error("This email is taken/exist");
   }

        //hash password
        // const salt = await bcrypt.genSalt(10);
        // const passwordHashed = await bcrypt.hash(password, salt)

   //Check if the user updating the password
   if(password){
        //update
        const admin = await Admin.findByIdAndUpdate(req?.userAuth?._id, {
          email,
          password: await hashPassword(password),
          name,
        },
      {
        new: true,
        runValidators: true,
      }
      );
        
        res.status(200).json({
          status: 'Success',
          data: admin,
          message: "Admin updated successfully"
        });
   }else{

     //update
     const admin = await Admin.findByIdAndUpdate(req?.userAuth?._id, {
      email,
      name,
    },
  {
    new: true,
    runValidators: true,
  }
  );
    
    res.status(200).json({
      status: 'Success',
      data: admin,
      message: "Admin updated successfully"
    });
   }
   });


    ///@description Get delete Admin
 //@ rout DELETE /api/admins/delete admin
 //@ acess Private

 exports.deleteAdmCtrl =  (req, res)=>{
    try {
      res.status(201).json({
          status: "Success",
          data: 'delete Admin',
      })
    } catch(error) {
      res.json({
          status: 'Failed',
          error: error.message,
      })
    }
  };


        ///@description Get suspend Admin
 //@ rout PUT /api/admins/suspend admin
 //@ acess Private
  exports.adminSuspendTeacherCtrl =  (req, res)=>{
    try {
      res.status(201).json({
          status: "Success",
          data: 'Admin suspend teacher',
      })
    } catch (error) {
      res.json({
          status: 'Failed',
          error: error.message,
      })
    }
  };
     

         ///@description Get unsuspend Admin
 //@ rout PUT /api/admins/unsuspend admin
 //@ acess Private

 exports.adminUnsuspendTeacherCtrl =  (req, res)=>{
    try {
      res.status(201).json({
          status: "Success",
          data: 'Admin unsuspend teacher',
      })
    } catch (error) {
      res.json({
          status: 'Failed',
          error: error.message,
      })
    }
  };


           ///@description Get withdraw Admin
 //@ rout PUT /api/admins/withdraw admin
 //@ acess Private

  exports.adminWithdrawTeacherCtrl = (req, res)=>{
    try {
      res.status(201).json({
          status: "Success",
          data: 'Admin Withdraw teacher',
      })
    } catch (error) {
      res.json({
          status: 'Failed',
          error: error.message,
      })
    }
  };

           ///@description Get unwithdraw Admin
 //@ rout PUT /api/admins/unwithdraw admin
 //@ acess Private

  exports.adminUnwithdrawTeacherCtrl =  (req, res)=>{
    try {
      res.status(201).json({
          status: "Success",
          data: 'Admin UnWithdraw teacher',
      })
    } catch (error) {
      res.json({
          status: 'Failed',
          error: error.message,
      })
    }
  };


             ///@description Get publish Admin
 //@ rout PUT /api/admins/publish admin
 //@ acess Private

 exports.adminPublishResultCtrl =  (req, res)=>{
    try {
      res.status(201).json({
          status: "Success",
          data: 'Admin publish exam ',
      })
    } catch (error) {
      res.json({
          status: 'Failed',
          error: error.message,
      })
    }
  };

        ///@description Get unpublish Admin
 //@ rout PUT /api/admins/unpublish admin
 //@ acess Private

 exports.adminUnpublishResultCtrl = (req, res)=>{
    try {
      res.status(201).json({
          status: "Success",
          data: 'Admin Unpublish exam',
      })
    } catch (error) {
      res.json({
          status: 'Failed',
          error: error.message,
      })
    }
  };


