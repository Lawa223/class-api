// const { timeStamp } = require("console");
const mongoose = require ("mongoose");
// const { Schema } = mongoose;
// const { types } = require("util");
// const yearGroup = require("./yearGroup");



const subjectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,

        },
        email: {
            type: String,
            ruquired: true,

        },
        password: {
            type: String,
            ruquired: true,

        },
            studentId: {
            type: String,
            ruquired: true,
            default: function () {
                return(
                "STU" +
                Math.floor(100 + Math.random () * 90) +
                Date.now (). toString() .slice(2,4) + 
                this.name
                .split(" ")
               .map(name => name [0])
                .join("")
                .toUpperCase()
                );
            },
        },
        isWithdrawn: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            default: "Student",
        },
        //Classes are from level 1 to 6
        //Keep track of the class level the student is in
        classLevel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ClassLevel",
            required: true,
        },
        currentClassLevel: {
            type: String,
            default: function () {
                 return this.classLevels[this.classLevels.length - 1]  
            },
        },
        AcademicYear: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AcademicYear",
            required: true,
        },
        dateAdmited: {
            type: Date,
            default: Date.now,
        },
        examsResult: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ExamsResults",
                
            },
        ],
        program: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Program",
            required: true,
        },
        isPromotedToLevel200: {
            type: Boolean,
            default: false,
        },
        isPromotedToLevel300: {
            type: Boolean,
            default: false,
        },
        isPromotedToLevel400: {
            type: Boolean,
            default: false,
        },
        isGraduated: {
            type: Boolean,
            default: false,
        },
        isSuspended: {
            type: Boolean,
            default: false,
        },
        prefectName: {
            type: String,
        },
        description: {
            type: String,
            required: true,
        },
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
        },
        academicTerm: {
             type: mongoose.Schema.Types.ObjectId,
             ref: "AcademicTerm",
             require: true,
        },
        duration: {
            type: String,
            required: true,
            default: "3 months",
        },
        //behaviour Repourt:[
       // {
        //    type: mongoose.Schema.Types.ObjectId,
        ///    ref: "BehaviourReport"
       // },
       // ],
          //financial report:[
            //{
           //     type: mongoose.Schema.Types.ObjectId,
           //     ref: "FinancialReport",
           // },
          //  ],
            //year Group
           // yearGraduated: {
             //   type: string,
            //},

    },
    {
        timeStamp: true,
    },
);


const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;