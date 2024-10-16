// const { application } = require("express");
const mongoose = require("mongoose");
// const ClassLevel = require("../Academic/ClassLevel");
// const AcademicYear = require("../Academic/AcademicYear");
// const AcademicTerm = require("../Academic/AcademicTerm");

const teacherSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            ruquired: true,

        },
        email: {
            type: String,
            ruquired: true,

        },
        password: {
            type: String,
            ruquired: true,

        },
        dateEmployed: {
            type: Date,
            default: Date.now,
        },
        teacherId: {
            type: String,
            ruquired: true,
            default: function () {
                return(
                "TEA" +
                Math.floor(100 + Math.random() * 90) +
                Date.now().toString().slice(2,4) + 
                this.name
                .split(" ")
               .map(name => name [0])
                .join("")
                .toUpperCase()
                );
            },

        },
        //if withdrawn, theteacher will not be able to login

        isWithdrawn: {
            type: Boolean,
            default: false,
        },
        //if suspended ,the teacher can login but cannot perform any task
        isSuspended: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            default: "teacher",
        },
        subjectModel: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            // required: true,
        },
        applicationStatus: {
            type: String,
            enum: ["pending","Approved","rejected"],
            default: "pending",
        },
        // program: {
        //     type: String,
           
            
        // },
        //A teacher can be teach in more than one class level
        classLevel: {
            type: mongoose.Schema.Types.ObjectId,
           
            
        },
        academicYear: {
            type: String,
        },
        examsCreated: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exam",
            
        },
        ],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            // required: true,
        },
        academicTerm: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Teacher = mongoose.model("Teacher", teacherSchema)

module.exports = Teacher;