const AsyncHandler = require("express-async-handler");

const Admin = require("../../Model/Staff/Admin");
// const AcademicTerm = require("../../Model/Academic/AcademicTerm");
const ClassLevel = require("../../Model/Academic/ClassLevel");


 ///@description create Class level
 //@ rout POST /api/v1/class-levels
 //@ acess Private
exports.createClassLevel = AsyncHandler( async(req, res) =>{
    const {name,description,} = req.body
    //Check if exists
    const classFound = await ClassLevel.findOne({name});
    if(classFound){
        throw new Error("Class already exists")
    }
      //create
       const classCreated = await ClassLevel.create({
        name,
        description,
        createdBy: req.userAuth._id,
       })

    res.status(201).json({
        status: "Success",
        message: "Class created successfully",
        data: classCreated,
    });

    //push class into admin
    const admin = await Admin.findById(req.userAuth._id);
    admin.classLevel.push(academicTermCreated._id)
    //save
    await admin.save();
});



///@description get All Class Level
 //@ rout GET /api/v1/class-levels
 //@ acess Private
 exports.getClassLevels = AsyncHandler( async(req, res) =>{
    
    const classLevel = await ClassLevel.find();
   

    res.status(201).json({
        status: "Success",
        message: "Class level fetched successfully",
        data: classLevel,
    })
});



///@description Single class level
 //@ rout GET /api/v1/class-levels/:id
 //@ acess Private
 exports.getClassLevel = AsyncHandler( async(req, res) =>{
   
    const classLevel = await ClassLevel.findById(req.params.id);
   

    res.status(201).json({
        status: "Success",
        message: "Class level fetched successfully",
        data: classLevel,
    })
});


///@description Update class Level
 //@ rout PUT /api/v1/class-levels/:id
 //@ acess Private

 exports.updateClassLevel = AsyncHandler( async(req, res) =>{
    const {name,description} = req.body
    //Check if name exist
    const classFound = await ClassLevel.findOne({name})
    if(classFound){
        throw new Error("Class already exist")
    }
    const classLevel = await ClassLevel.findByIdAndUpdate(req.params.id,
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
        message: "Class updated successfully",
        data: classLevel,
    })
});


    ///@description Delete class Level
 //@ rout PUT /api/v1/class-levels/:id
 //@ acess Private

exports.deleteClassLevel = AsyncHandler( async(req, res) =>{
   await ClassLevel.findByIdAndDelete(req.params.id);
   

    res.status(201).json({
        status: "Success",
        message: "Class level deleted successfully",
        
    })
});