const mongoose = require ("mongoose");
// const Subject = require("./Subjects");
// const { Schema } = mongoose
// const { timeStamp } = require("console");



//ExamSchema
const examSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            required: true,
        } ,
        program: {
            type:  mongoose.Schema.Types.ObjectId,
            ref: "Program",
            required: true,
        },
        passMark: {
            type: Number,
            required: true,
            default: 50,
        },
        totalMark: {
            type: Number,
            required: true,
            default: 100,
        },
        academicTerm: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AcademicTerm",
            require: true,
       },
       duration: {
        type: String,
        required: true,
        default: "30 minutes",
    },
    examTime: {
        type: String,
        required: true,
    },
    examType: {
        type: String,
        required: true,
        default: "Quiz",
    },
    examDate: {
        type: Date,
        required: true,
        default: new Date(),
    },
    examStatus: {
        type: String,
        required: true,
        default: "pending",
        enum: ["pending","Live"]
    },
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question", 
        }
    ],
    classLevel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClassLevel",
        required: true,
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
    },
    {
        timeStamps: true,
    },
);

const Exam = mongoose.model("Exam",examSchema);

module.exports = Exam;