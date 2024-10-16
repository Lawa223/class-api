const AsyncHandler = require("express-async-handler");
// const program = require("../model/Academic/ClassLevel")
const Admin = require("../../Model/Staff/Admin");
// const ClassLevel = require("../../Model/Academic/ClassLevel");
const Program = require("../../Model/Academic/program");
// const AcademicTerm = require("../../Model/Academic/AcademicTerm");
// const ClassLevel = require("../../Model/Academic/ClassLevel");


 ///@description create program
 //@ rout POST /api/v1/programs
 //@ acess Private
exports.programCreated = AsyncHandler( async(req, res) =>{
    const {name,description} = req.body
    //Check if exists
    const programFound = await Program.findOne({name});
    if(programFound){
        throw new Error("program already exists")
    }
      //create
       const program = await Program.create({
        name,
        description,
        createdBy: req.userAuth._id,
       })

    res.status(201).json({
        status: "Success",
        message: "Program created successfully",
        data: program,
    });

    //push program into admin
    const admin = await Admin.findById(req.userAuth._id);
    admin.programs.push(program._id)
    //save
    await admin.save();
});



///@description get All program
 //@ rout GET /api/v1/programs
 //@ acess Private
 exports.getPrograms = AsyncHandler( async(req, res) =>{
    
    const programs = await Program.find();
   

    res.status(201).json({
        status: "Success",
        message: "Programs fetched successfully",
        data: programs,
    })
});



///@description Single program
 //@ rout GET /api/v1/programs/:id
 //@ acess Private
 exports.getProgram = AsyncHandler( async(req, res) =>{
   
    const program = await Program.findById(req.params.id);
   

    res.status(201).json({
        status: "Success",
        message: "program fetched successfully",
        data: program,
    })
});


///@description Update program
 //@ rout PUT /api/v1/programs/:id
 //@ acess Private

 exports.updateProgram = AsyncHandler( async(req, res) =>{
    const {name,description} = req.body
    //Check if name exist
    const programFound = await Program.findOne({name})
    if(programFound){
        throw new Error("Class already exist")
    }
    const program = await Program.findByIdAndUpdate(req.params.id,
         {
            name,
            description,
            createdBy: req.userAuth._id
         },
         {
            new: true
         },
        );
   

    res.status(201).json({
        status: "Success",
        message: "program updated successfully",
        data: program,
    })
});


    ///@description Delete program
 //@ rout PUT /api/v1/programs/:id
 //@ acess Private

exports.deletePrograms = AsyncHandler( async(req, res) =>{
   await Program.findByIdAndDelete(req.params.id);
   

    res.status(201).json({
        status: "Success",
        message: "Program deleted successfully",
        
    })
});