const AsyncHandler = require("express-async-handler")
const isTeacher = require("../../Midleware/isTeacher");
const Exam = require("../../Model/Academic/Exam");
const Question = require("../../Model/Academic/Question");
const Teacher = require("../../Model/Staff/Teacher");
// const isTeacherLogin = require("../..Midleware/isTeacherLogin")



     
///@description create Question
 //@ rout PUT /api/v1/questions/:examsID
 //@ acess Private Teachers only




 exports.createQuestion = AsyncHandler(async(req,res)=> {
    const {question,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAnswer,
        // createdBy: req.userAuth._id,
    } = req.body;
    // find the exam
    const examFound = await Exam.findById(req.params.examID);
    if(!examFound){
        throw new Error("Exam not Found")
    }
    //Check if question is exist
    const questionExist = await  Question.findOne({ question })
    if(questionExist){
        throw new Error("Question already exists")
    }
    //create Exam
    const questionCreated = await Question.create({
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAnswer,
        createdBy: req.userAuth._id,
    });
    //add the quetions into exam
    examFound.questions.push(questionCreated?._id);
    //save
    await examFound.save();
    res.status(201).json({
        status: 'Success',
        data: questionCreated,
        message: "Question Created"
      });
 });


 
///@description get All Question
 //@ rout GET /api/v1/question
 //@ acess Private
 exports.getQuestions = AsyncHandler( async(req, res) =>{
    
    const questions = await Question.find();
   

    res.status(201).json({
        status: "Success",
        message: "Question fetched successfully",
        data: questions,
    })
});




 ///@description Single question
 //@ rout GET /api/v1/question/:id
 //@ acess Private Teacher only
 exports.getQuestion = AsyncHandler( async(req, res) =>{
   
    const question = await Question.findById(req.params.id);
   

    res.status(201).json({
        status: "Success",
        message: "Question fetched successfully",
        data: question,
    })
});



///@description Update question
 //@ rout PUT /api/v1/question/:id
 //@ acess Private

 exports.updateQuestion = AsyncHandler( async(req, res) =>{
    const {question,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAnswer,
        
    } = req.body;
    //Check if name exist
    const questionFound = await Question.findOne({question})
    if(questionFound){
        throw new Error("Question already exist")
    }
    const querry = await Question.findByIdAndUdate(req.params.id,
         {
            question,
            optionA,
            optionB,
            optionC,
            optionD,
            correctAnswer,
            createdBy: req.userAuth._id
         },
         {
            new: true,
         },
        );
   

    res.status(201).json({
        status: "Success",
        message: "Question updated successfully",
        data: querry,
    })
});