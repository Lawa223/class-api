// const { timeStamp } = require("console");
const mongoose = require("mongoose");
// const { type } = require("os");
const {schema} = mongoose;

const programSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        duration: {
            type: String,
            required: true,
            default: "4 years",
        },
        //Created Automatically
        //CSFTY
        code: {
            type: String,
            default: function () {
                return (
                    this.name
                    .split(" ")
                    .map(name => name[0])
                    .join("")
                    .toUpperCase () +
                    Math.floor(10 + Math.random * 90) +
                    Math.floor(10 + Math.random * 90)
                );
            },
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true,
        },
        //We will push the teachers that are in charge of the program
         teachers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Teachers",
                default: [],
            },
         ],
         students: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Students",
                default: [],

            },
         ],
         //We will push the objects that are in the program when the program is created
         subjects: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Subject",
                default: [],
            },
         ],

    },
    {
        timeStamp: true
    },
);

const Program = mongoose.model("Program", programSchema);

module.exports = Program;