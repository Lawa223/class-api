      const AsyncHandler = require("express-async-handler")      
      const { hashPassword, isPassMatched } = require("../../utils/helpers");
      const generateToken = require("../../utils/generateToken");
      const Teacher = require("../../Model/Staff/Teacher");
      const Admin = require("../../Model/Staff/Admin");
      // const Admin = require("../../Model/Staff/Admin");
      // const bcrypt = require("bcryptjs");
        

 ///@description Admin register teachers
 //@ rout POST /api/teachers/admin/register
 //@ acess Public


 exports.adminRegisterTeacher = AsyncHandler(async(req, res) =>{
    const {name,email,password} = req.body;


    //find the admin 
    const adminFound = await Admin.findById(req.userAuth._id)
    if(!adminFound){
      throw new Error("Admin not found")
    }

    //Check if teacher already exist
    const teacher = await Teacher.findOne({email});
    if(teacher){
        throw new Error("Teacher already employed")
    }
    //Hash Password
    const hashedPassword = await hashPassword(password);
    //create
    const teacherCreated = await Teacher.create({
        name,
        email,
        password: hashedPassword,
    });
    //push Teacher into Admin
    adminFound.teachers.push(teacherCreated?._id);
    await adminFound.save();
    //send teacher Data
    res.status(201).json({
        status: "success",
        message: "Teacher registered successfully",
        data: teacherCreated,
    });
 });


 ///@description login a teacher
 //@ rout POST /api/teachers/login
 //@ acess Public

 exports.loginTeacher = AsyncHandler(async(req,res)=>{
    const {email,password} = req.body
    //find the user
    const teacher = await Teacher.findOne({email});
    if (!teacher){
         return res.json({message: "Invalid login credentials"});
    }
    // Verify password

    const isMatched = await isPassMatched(password, teacher?.password);
    if(!isMatched){
        return res.json({message: "Invalid login credentials"});
    }else{
        res.status(200).json({
            status: "success",
            message: "Teacher logged in successfully",
            data: generateToken(teacher._id),
        })
        
    }
 })


 ///@description Get all teachers
 //@ rout Get /api/admin/teachers
 //@ acess Private Admin only

 exports.getAllTeachersAdmin = AsyncHandler(async(req,res) =>{
   const teachers = await Teacher.find();

      //  res.status(200).json(res.results);

       res.status(200).json({
        status: "success",
        message: "Teachers fetched  successfully",
        data: teachers,
    });

});


 ///@description Get single teacher
 //@ rout Get /api/admin/teachers/:teacherID/admin
 //@ acess Private Admin only

 exports.getTeacherByAdmin = AsyncHandler(async(req,res) =>{
    const teacherID = req.params.teacherID
    //find the teacher
    const teacher = await Teacher.findById(teacherID)
  if(!teacher){
    throw new Error("Teacher Not Found")
  }
    res.status(200).json({
        status: "success",
        message: "Teachers fetched  successfully",
        data: teacher,
    });
});
 

 ///@description Get Teacher Profile
 //@ rout Get /api/admin/teachers/Profile
 //@ acess Private Teacher only

 exports.getTeacherProfile = AsyncHandler(async(req, res) =>{
    const teacher = await Teacher.findById(req.userAuth?._id).select("-password-createdAt-updatedAt")
    if(!teacher){
        throw new Error("Teacher Not Found");
    }
    res.status(200).json({
        status: "success",
        message: "Teacher profiled fetched  successfully",
        data: teacher,
    });
});
 


   ///@description Teacher updating profile Admin
 //@ rout POST /api/v1/:teacherID/update
 //@ acess Private Teacher only

 exports.teacherUpdateProfile =  AsyncHandler( async(req, res)=>{
    const {email, name, password} = req.body
     
     //if email is taken
     const emailExist = await Teacher.findOne({email});
     if(emailExist){
      throw new Error("This email is taken/exist")
     }
  
          //hash password
          // const salt = await bcrypt.genSalt(10);
          // const passwordHashed = await bcrypt.hash(password, salt)
  
     //Check if the user updating the password
     if(password){
          //update
          const teacher = await Teacher.findByIdAndUpdate(req.userAuth._id, {
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
            data: teacher,
            message: "Teacher profile updated successfully"
          });
     }else{
  
     }
  
  
  
      //update
        const teacher = await Teacher.findByIdAndUpdate(req.userAuth._id, {
        email,
        password,
        name,
      },
    {
      new: true,
      runValidators: true,
    }
    );
      
      res.status(200).json({
        status: 'Success',
        data: teacher,
        message: "Teacher profile updated successfully"
      });
     });


     
   ///@description Admin updating Teacher profile 
 //@ rout POST /api/v1/teacherID/admin
 //@ acess Private Admin only

 exports.adminUpdateTeacher =  AsyncHandler( async(req, res)=>{
    const {program,classLevel, academicYear,subject} = req.body
     
     //if email is taken
     const teacherFound = await Teacher.findById(req.params.teacherID);
     if(!teacherFound){
      throw new Error("Techer Not Found")
     }
     //Check if Teacher is withdrawn
    if(teacherFound.isWithdrawn){
      throw new Error("Action denied,teacher is withdraw")
  }
  //assign a program
  if(program){
      teacherFound.program = program;
      await teacherFound.save()
      res.status(200).json({
          status: 'Success',
          data: teacherFound,
          message: "Teacher profile updated successfully"
      });
  }
   //assign class level
  if(classLevel){
      teacherFound.classLevel = classLevel,
      await teacherFound.save()
      res.status(200).json({
          status: 'Success',
          data: teacherFound,
          message: "Teacher profile updated successfully"
      });
  }

   //assign academic Year
   if(academicYear){
      teacherFound.academicYear = academicYear,
      await teacherFound.save()
      res.status(200).json({
          status: 'Success',
          data: teacherFound,
          message: "Teacher profile updated successfully"
      });
   }


   //assign subject
   if(subject){
      teacherFound.subject = subject,
      await teacherFound.save()
      res.status(200).json({
          status: 'Success',
          data: teacherFound,
          message: "Teacher profile updated successfully"
      
      });
  }
 
  
          //hash password
          const salt = await bcrypt.genSalt(10);
          const passwordHashed = await bcrypt.hash(password, salt)
  
     //Check if the user updating the password
     
    });
     
    
      

   