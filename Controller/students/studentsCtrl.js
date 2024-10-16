const AsyncHandler = require ("express-async-handler")
const Student = require("../../Model/Academic/Student");
const { hashPassword, isPassMatched } = require("../../utils/helpers");
const generateToken = require("../../utils/generateToken");
const Teacher = require("../../Model/Staff/Teacher");
const Exam = require("../../Model/Academic/Exam");
const ExamResults = require("../../Model/Academic/ExamResults");
// const AcademicTerm = require("../../Model/Academic/AcademicTerm");
// const ClassLevel = require("../../Model/Academic/ClassLevel");
const Admin = require("../../Model/Staff/Admin");



///@description Admin register student
 //@ rout POST /api/students/admin/register
 //@ acess Public Admin only


 exports.adminRegisterStudent = AsyncHandler(async(req, res, ) =>{
    const {name,email,password} = req.body
     
    
    //find the admin 
    const adminFound = await Admin.findById(req.userAuth._id)
    if(!adminFound){
      throw new Error("Admin not found")
    }
   
    //Check if teacher already exist
    const student = await Student.findOne({email});
    if(student){
        throw new Error("Student already employed")
    }
    //Hash Password
    const hashedPassword = await hashPassword (password);
    //create
    const studentRegistered = await Student.create({
        name,
        email,
        password: hashedPassword,
    });

     //push Teacher into Admin
     adminFound.students.push(studentRegistered?._id);
     await adminFound.save();
    
    //send Student Data
    res.status(201).json({
        status: "success",
        message: "Student registered successfully",
        data: studentRegistered,
    });
 });


 
 ///@description login student
 //@ rout POST /api/students/login
 //@ acess Public

 exports.loginStudent = AsyncHandler (async(req,res)=>{
    const {email,password} = req.body
    //find the user
    const student = await Student.findOne({email});
    if (!student){
         return res.json({message: "Invalid login credentials"});
    }
    // Verify password

    const isMatched = await isPassMatched(password, student?.password);
    if(!isMatched){
        return res.json({message: "Invalid login credentials"});
    }else{
        res.status(200).json({
            status: "success",
            message: "Student logged in successfully",
            data: generateToken(student._id),
        });
        
    }
 });


  ///@description Get Student Profile
 //@ rout Get /api/admin/studentss/Profile
 //@ acess Private Student only

 exports.getStudentProfile = AsyncHandler(async(req,res) =>{
    const student = await Student.findById(req.userAuth?._id)
    .select("-password-createdAt-updateAt")
     .populate("examResults")

    if(!student){
        throw new Error("Student Not Found");
    }
    //get student Profile
    const studentProfile = {
        name: student?.name,
        email: student?.email,
        currentClassLevel: student?.currentClassLevel,
        program: student?.program,
        dateAdmitted: student?.dateAdmitted,
        isSuspended: student?.isSuspended,
        isWithdrawn: student?.isWithdrawn,
        studentId: student?.studentId,
        prefectName: student?.prefectName,


    }
    //get student Exam Results
     const examResults = student?.examResults;
     //Current exam
     const currenExamResult = examResults[examResults.lenght - 1]
    //  console.log(currenExamResult)
      //Check if exam results is published
      const isPublished = currenExamResult?.isPublished;
    //    console.log(currenExamResult)

      //Send respond


    res.status(200).json({
        status: "success",
        message: "Student profiled fetched  successfully",
        data: {
            studentProfile,
            currenExamResult: isPublished? currenExamResult: [],
        }
    });
});
 


 ///@description Get all students
 //@ rout Get /api/admin/students
 //@ acess Private Admin only

 exports.getAllStudentsByAdmin = AsyncHandler(async(req,res) =>{
    const students = await Student.find();
    res.status(200).json({
        status: "success",
        message: "Studentss fetched  successfully",
        data: students,
    });
});



 ///@description Get single student
 //@ rout Get /api/admin/students/:studentID/admin
 //@ acess Private Admin only

 exports.getStudentByAdmin = AsyncHandler(async(req,res) =>{
    const studentID = req.params.teacherID
    //find the teacher
    const student = await Student.find(studentID)
  if(!student){
    throw new Error("Student Not Found")
  }
    res.status(200).json({
        status: "success",
        message: "Student fetched  successfully",
        data: student,
    });
});



   ///@description Student updating profile 
 //@ rout POST /api/v1/students/students/update
 //@ acess Private Student only

 exports.studentUpdateprofile =  AsyncHandler ( async(req, res)=>{
    const {email, password} = req.body
     
     //if email is taken
     const emailExist = await Student.findOne({email});
     if(emailExist){
      throw new Error("This email is taken/exist")
     }
  
          //hash password
        //   const salt = await bcrypt.genSalt(10);
        //   const passwordHashed = await bcrypt.hash(password, salt)
  
     //Check if the user updating the password
     if(password){
          //update
          const student = await Student.findByIdAndUpdate(req.userAuth._id, {
            email,
            password: await hashPassword(password),
            
          },
        {
          new: true,
          runValidators: true,
        }
        );
          
          res.status(200).json({
            status: 'Success',
            data: student,
            message: "Student profile updated successfully"
          });
     }else{
  
     }
  
  
  
      //update
        const teacher = await Teacher.findByIdAndUpdate(req.userAuth._id, {
        email,
        
        
      },
    {
      new: true,
      runValidators: true,
    }
    );
      
      res.status(200).json({
        status: 'Success',
        data: teacher,
        message: "Student profile updated successfully"
      });
     });


        ///@description  Admin updating Student eg: Assigning Classes..... 
 //@ rout PUT /api/v1/students/students/:studentID/update/admin
 //@ acess Private Admin only


 exports.adminUpdateStudent = AsyncHandler(async(req,res) =>{
    const {classLevels,
        academicYear,
        program,
        email,
        name,
        prefectName,
        isSuspended,
        isWithdrawn
    } = req.body

    //find the student by Id
    const studentFound = await Student.findById(req.params.studentID);
    if(!studentFound){
        throw new Error("Student Not Found")
    }
    const   studentUpdated = await Student.findByIdAndUpdte(req.params.studentID, {
        $set: {name,
            email,
            academicYear,
            program,
            prefectName,
            isSuspended,
            isWithdrawn,
        },
        $addToSet: {
            classLevels
        }
    },{
        new: true,
    });
    //Send response
    res.status(200).json({
        status: "success",
        message: "Student updated  successfully",
        data: studentUpdated,
    });
    
 });


      ///@description  Student Taking Exam 
 //@ rout POST /api/v1/students/Exams/:ExamsID/write
 //@ acess Private Students only

 exports.writeExam = AsyncHandler(async(req,res) =>{
    //get student
    const studentFound = await Student.findById(req.userAuth?._id)
    //check if student not found
if(!studentFound){
    throw new Error("Student not found")
}
//Get exam
const examFound = await Exam.findById(req.params.examID)
.populate("questions")
.populate("academicTerm")


if(!examFound){
    throw new Error("Exam not found")
}
//Get Question
const questions = examFound?.questions;
//get student Answer
const studentAnswers = req.body.answers;


//Build report object
let correctAnswer = 0;
let wrongAnswer = 0;
let status = '' //failed/pass
// let totalQuestions = 0;
let grade = 0;
let score = 0;
let remarks = ''
let answeredQuestions = [];



//Check if student answer all question
if (studentAnswers.length !== questions.length){
    throw new Error("You have not answer all the question")
}

// // //Check if student has already taken the exams
const studentFoundInResults = await ExamResults.findOne({ student: studentFound?._id});
if(studentFoundInResults){
    throw new Error ("You have already written this exam");
};

// //Check if student is suspended/ withdrawn
if(studentFound.isWithdrawn  || studentFound.isSuspended){
    throw new Error ("You are suspended/withdrawn, you can't take this exam")
}

// let correctAnswer = 0;
// let wrongAnswer = 0;
// let status = '' //failed/pass
// let totalQuestions = 0;
// let grade = 0;
// let score = 0;
// let remarks = ''
// let answeredQuestions = [];


  

//Check for answer
for(let i = 0; i < questions.length; i++){
    //Find the question
    const question = questions[i];
    // console.log(question)
    //Check if the answer is correct
    if(question.correctAnswer === studentAnswers[i]){
        correctAnswer++
        score++
        question.isCorrect = true;
    }else{
        wrongAnswer++;
    }
}
    
  




totalQuestions = questions.length;
grade = (correctAnswer / questions.length) * 100;
answeredQuestions = questions.map(question=>{
    return {
        question: question.question,
        correctAnswer: question.correctAnswer, 
        isCorrect: question.isCorrect,
    }
});

//Calculate reports
if(grade >= 50){
    status = "Pass"
}else{
    status = "Fail"
};

    //Remarks
    if(grade >= 80){
        remarks = "Excellent"
    }else if(grade >= 70){
        remarks = "Very Good"
    }else if(grade >= 60){
        remarks = "Good"
    }else if(grade >= 50){
        remarks = "Fair"
    }else{
        remarks = "Poor"
    }

    // //Generate Exam Results
    const examResults = await ExamResults.create({
        studentID: studentFound?.studentId,
        exam: examFound?._id,
         grade,
         score,
         status,
         remarks,
         classLevel: examFound?.classLevel,
         academicTerm: examFound?.academicTerm,
         academicYear: examFound?.academicYear, 
         answeredQuestions: answeredQuestions,
    });

    // //push the results into
    studentFound.examResults.push(examResults?._id) 
    // //save
    await studentFound.save()

     //Promoting Student
      //Promote student to level 200

    //  console.log(examFound.academicTerm);
     if(examFound.academicTerm.name === "3rd term" 
        && status === "Pass" && 
        studentFound?.currentClassLevel === "100"){
          
            studentFound.classLevels.push("Level 200");
            studentFound.currentClassLevel = "Level 200";
             await  studentFound.save();
        }
  


           //Promote student to level 300

    
     if(examFound.academicTerm.name === "3rd term" 
        && status === "Pass" && 
        studentFound?.currentClassLevel === "200"){
        console.log("yes")
     }

     studentFound.classLevels.push("Level 300");
     studentFound.currentClassLevel = "Level 300";
      await  studentFound.save();



           //Promote student to level 400

    
     if(examFound.academicTerm.name === "3rd term" 
        && status === "Pass" && 
        studentFound?.currentClassLevel === "300"){
        console.log("yes")
     }

     studentFound.classLevels.push("Level 400");
     studentFound.currentClassLevel = "Level 400";
      await  studentFound.save();



             //Promote student to graduate

    
     if(examFound.academicTerm.name === "3rd term" 
        && status === "Pass" && 
        studentFound?.currentClassLevel === "300")
        {
        studentFound.isGraduated = true;
        studentFound.yearGraduated = new Date();
        await studentFound.save();
     }

   


res.status(200).json({
    status: "Success",
    data: "You have submitted your exam.Check later for the results",
})
 })