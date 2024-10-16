const mongoose = require("mongoose");
// const { schema } = mongoose;
// const Student = require("./Student")
// const ClassLevel = require("./ClassLevel")
// const { timeStamp } = require("console")


//ExamResultSchema
const examResultsSchema = new mongoose.Schema(
    {
        StudentID: {
            type: String,
            require: true,
       },
       exam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam",
        require: true,
   },
   grade: {
    type: Number,
    required: true,
    },
    score: {
        type: Number,
        required: true,
        },
        passMark: {
            type: Number,
            required: true,
            default: 50,
            },
            answeredQuestions:[
                {
                    type: Object,
                },
            ],
            //Faiiled/Passed
            status: {
                type: String,
                required: true,
                enum: ["Pass", "Fail"],
                default: "Fail",
                },
                 //Excellent/Good/Poor
            remarks: {
                type: String,
                required: true,
                enum: ["Excellent", "Good","Poor","Fair"],
                default: "Poor",
                },
            // position: {
            //         type: Number,
            //         required: true,
            //         },
                //     subject: {
                //         type: mongoose.Schema.Types.objectId,
                //         ref: "Subject",
                        
                //    },
                   classLevel: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "ClassLevel",
                    
               },
               academicTerm: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "AcademicTerm",
                require: true,
           },
           academicYear: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AcademicYear",
            require: true,
       },
       isPublished: {
        type: Boolean,
        default: false,
       },
    } ,
    {
        timeStamps: true,
    } , 
);

const ExamResults = mongoose.model("ExamResults", examResultsSchema)

module.exports = ExamResults;