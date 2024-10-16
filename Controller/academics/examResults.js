const AsyncHandler = require("express-async-handler");
const ExamResults = require("../../Model/Academic/ExamResults");
const { find } = require("../../Model/Academic/yearGroup");
const Student = require("../../Model/Academic/Student");


///@description Exam results Checking
 //@ rout POST /api/v1/exam-results/:id/checking
 //@ acess Private - stdents only


 exports.checkExamResults = AsyncHandler (async(req, res) => {
    //find the student
   const studentFound = await Student.findById(req.userAuth?._id)
   if(!studentFound){
    throw new Error("No Student Found")
   }
   // find the exam results
   const examResult = await ExamResults.findOne({
    studentID: studentFound?.studentId,
    _id: req.params.id,
   }).populate({
     path: "exam",
     populate: {
        path: "questions",
     },
   })
   .populate('classLevel')
   .populate('academicTerm')
   .populate('academicYear')
   //Check if exam is Published
   if(examResult?.isPublished === false){
    throw new Error("Exam result is not available,check out later");
   }
   res.status(200).json({
    status: "success",
    message: "Exam result",
    data: examResult,
    student: studentFound,
});

 });


 ///@description Get Exam results (name, id)
 //@ rout POST /api/v1/exam-results
 //@ acess Private - students only

 exports.getAllExamResults = AsyncHandler (async(req, res) => {
    const results = await ExamResults.find().select("exam").populate('exam')
    res.status(200).json({
        status: "success",
        message: "Exam results fetched",
        data: results,
    });
  });



   ///@description Admin publishing exam results
 //@ rout PUT /api/v1/exam-results/:id/admin-toggle-publish
 //@ acess Private - Admin only

 exports.adminToggleExamResults = AsyncHandler (async(req, res) => {
    //find the exam results
    const examResult = await ExamResults.findById(req.params.id)
    if(!examResult){
        throw new Error('Exam result not found')
    }
    // const results = await ExamResult.find().select("exam")
    const publishedResult = await ExamResults.findByIdAndUpdate(req.params.id, {
        isPublished: req.body.publish,
    },
    {
        new: true,
    }
)
    res.status(200).json({
        status: "success",
        message: "Exam results Updated",
        data: publishedResult,
    });
  });