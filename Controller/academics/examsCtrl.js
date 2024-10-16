const AsyncHandler = require("express-async-handler")
// const ClassLevel = require("../../Model/Academic/ClassLevel");
const Teacher = require("../../Model/Staff/Teacher");
const Exam = require("../../Model/Academic/Exam");
 
 ///@description create Exam
 //@ rout POST /api/v1/exams
 //@ acess Private Teacher only



 exports.createExam = AsyncHandler(async(req,res) =>{
    const {name,
         description,
         subject,
         program,
         academicTerm,
         academicYear,
         duration,
         examDate,
         examTime,
         examType,
         classLevel,
         createdBy , 
         examStatus,
        } = req.body;
        //find the Teacher
        const teacherFound = await Teacher.findById(req.userAuth?._id);
        if(!teacherFound){
            throw new Error("Teacher Not Found");
        }
        //Check if the Exam exist
        const examExist = await Exam.findOne({ name });
        if(examExist){
            throw new Error("Exam already exists");
        
        }
        //create
        const examCreated = await new Exam ({
            name,
            description,
            academicTerm,
            academicYear,
            program,
            subject,
            examDate,
            examTime,
            examType,
            duration,
            classLevel,
            createdBy,
            examStatus,
            createdBy : req.userAuth?._id,
        });
        //push the exam into Teacher
        teacherFound.examsCreated.push(examCreated._id)
        //save exam
        await examCreated.save();
        await teacherFound.save();
        res.status(201).json({
            status: "success",
            message: "Exam Created",
            data: examCreated,
        })
 });

 ///@description get All exams
 //@ rout GET /api/v1/Exams
 //@ acess Private
 exports.getExams = AsyncHandler( async(req, res) =>{
    const exams = await Exam.find().populate({
        path: "questions",
        populate: {
            path: 'createdBy'
        }
    })
    res.status(201).json({
        status: "Success",
        message: "Exam fetched successfully",
        data: exams,
    })
});



///@description Single Exam
 //@ rout GET /api/v1/Exams/:id
 //@ acess Private Teachers only
 exports.getExam = AsyncHandler( async(req, res) =>{
   
    const exams = await Exam.findById(req.params.id);
   

    res.status(201).json({
        status: "Success",
        message: "Exam fetched successfully",
        data: exams,
    })
});



///@description Update Exam
 //@ rout PUT /api/v1/examss/:id
 //@ acess Private Teacher only

 exports.updateExam = AsyncHandler( async(req, res) =>{
    const {name,
        description,
        subject,
        program,
        academicTerm,
        academicYear,
        duration,
        examDate,
        examTime,
        examType,
        classLevel,
        createdBy,
       } = req.body
    //Check if name exist
    const examFound = await Exam.findOne({name})
    if(examFound){
        throw new Error("Exam already exist")
    }
    const examUpdated = await Exam.findByIdAndUpdate(req.params.id,
         {
            name,
            description,
            subject,
            program,
            academicTerm,
            academicYear,
            duration,
            examDate,
            examTime,
            examType,
            classLevel,
            createdBy,
            createdBy: req.userAuth._id
         },
         {
            new: true
         },
        );
   

    res.status(201).json({
        status: "Success",
        message: "Exam updated successfully",
        data: examUpdated,
    })
});