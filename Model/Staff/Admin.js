
const mongoose = require ("mongoose");



// const { type } = require("os");
const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "admin",
        },
        academicTerms: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "AcademicTerm",
            }
        ],
        academicYears: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "AcademicYear",
            }
        ],
        programs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Program",
            }
        ],
        yearGroups: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "YearGroup",
            }
        ],
        classLevel: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ClassLevel",
            }
        ],
        teachers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Teacher",
            }
        ],
        students: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student",
            }
        ],
         
    },
    {
        timeStamp: true,
    },

);


//model
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;


