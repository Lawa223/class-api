const AsyncHandler = require("express-async-handler");
const Subject = require("../../Model/Academic/Subjects");
const ClassLevel = require("../../Model/Academic/ClassLevel");
const Program = require("../../Model/Academic/program");
// const Program = require("../../Model/Academic/program");

// const Admin = require("../../Model/Staff/Admin");






 ///@description create subject
 //@ rout POST /api/v1/subjects/:programID
 //@ acess Private
exports.createdSubjects = AsyncHandler( async(req, res) =>{
    const {name,description,academicTerm} = req.body
    //find the program
    const programFound = await Program.findById(req.params.programID);
    if(!programFound){
        throw new Error("program not found")
    }
    // const programFound = await Subject.findById(req.params.programId)
    //Check if exists
    const subjectFound = await Subject.findOne({name});
    if(subjectFound){
        throw new Error("Subject already exists")
    }
      //create
       const subjectCreated = await Subject.create({
        name,
        description,
        academicTerm,
        createdBy: req.userAuth._id,
       })

       //push to the program
       programFound.subjects.push(subjectCreated._id);
       //save
       await programFound.save();

    res.status(201).json({
        status: "Success",
        message: "Program created successfully",
        data: subjectCreated,
    });

  
});



///@description get All subjects
 //@ rout GET /api/v1/subjects
 //@ acess Private
 exports.getSubjects = AsyncHandler( async(req, res) =>{
    const classes = await Subject.find();
    res.status(201).json({
        status: "Success",
        message: "Subjects fetched successfully",
        data: classes,
    })
});



///@description Single subject
 //@ rout GET /api/v1/subjects/:id
 //@ acess Private
 exports.getSubject = AsyncHandler( async(req, res) =>{
   
    const program = await Subject.findById(req.params.id);
   

    res.status(201).json({
        status: "Success",
        message: "Subject fetched successfully",
        data: program,
    })
});


///@description Update subject
 //@ rout PUT /api/v1/subjects/:id
 //@ acess Private

 exports.updatesubjects = AsyncHandler( async(req, res) =>{
    const {name,description,academicTerm} = req.body
    //Check if name exist
    const subjectFound = await Subject.findOne({name})
    if(subjectFound){
        throw new Error("Subject already exist")
    }
    const subject = await Subject.findByIdAndUpdate(req.params.id,
         {
            name,
            description,
            academicTerm,
            createdBy: req.userAuth._id
         },
         {
            new: true
         },
        );
   

    res.status(201).json({
        status: "Success",
        message: "Subject updated successfully",
        data: subject,
    })
});


    ///@description Delete subject
 //@ rout PUT /api/v1/subject/:id
 //@ acess Private

exports.deleteSubject = AsyncHandler( async(req, res) =>{
   await Subject.findByIdAndDelete(req.params.id);
   

    res.status(201).json({
        status: "Success",
        message: "Subject deleted successfully",

    })
});