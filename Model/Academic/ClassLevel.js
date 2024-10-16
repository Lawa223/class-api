// const { timeStamp } = require("console");
const mongoose = require("mongoose");
// const {Schema } = mongoose;


const classLevelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        //Level 100 200 300 400
        description: {
            type: String,
        
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true,
        },
        //Students will be added to the class level when they are registered
        students: [
            {
             type: mongoose.Schema.Types.ObjectId,
             ref: "Student",
            },
         ],
         //Optional

         subjects: [
            {
             type: mongoose.Schema.Types.ObjectId,
             ref: "Subject",
            },
         ],
         teachers: [
            {
             type: mongoose.Schema.Types.ObjectId,
             ref: "Teacher",
            },
         ],
    },
    {
        timeStamp: true,
    },
);

const ClassLevel = mongoose.model("ClassLevel", classLevelSchema);

module.exports = ClassLevel;