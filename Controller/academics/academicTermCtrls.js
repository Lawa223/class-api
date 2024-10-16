const AsyncHandler = require("express-async-handler");
const Admin = require("../../Model/Staff/Admin");
const AcademicTerm = require("../../Model/Academic/AcademicTerm");



 ///@description create Academic Term years
 //@ rout POST /api/v1/academic-terms
 //@ acess Private
exports.createAcademicTerm = AsyncHandler( async(req, res) =>{
    const {name,description,duration} = req.body
    //Check if exists
    const academicTerm = await AcademicTerm.findOne({name});
    if(academicTerm){
        throw new Error("Academic term already exists")
    }
      //create
       const academicTermCreated = await AcademicTerm.create({
        name,
        description,
        duration,
        createdBy: req.userAuth._id,
       })

    res.status(201).json({
        status: "Success",
        message: "Academic Term created successfully",
        data: academicTermCreated,
    });

    //push academic into admin
    const admin = await Admin.findById(req.userAuth._id);
    admin.academicTerms.push(academicTermCreated._id)
    await admin.save();
});



///@description get All Academic Terms
 //@ rout GET /api/v1/academic-Terms
 //@ acess Private
 exports.getAcademicTerms = AsyncHandler( async(req, res) =>{
    
    const academicTerms = await AcademicTerm.find();
   

    res.status(201).json({
        status: "Success",
        message: "Academic terms fetched successfully",
        data: academicTerms,
    })
});



///@description Single Academic Term
 //@ rout GET /api/v1/academic-Terms/:id
 //@ acess Private
 exports.getAcademicTerm = AsyncHandler( async(req, res) =>{
   
    const academicTerm = await AcademicTerm.findById(req.params.id);
   

    res.status(201).json({
        status: "Success",
        message: "Academic Term fetched successfully",
        data: academicTerm,
    })
});


///@description Update Academic term
 //@ rout PUT /api/v1/academic-terms/:id
 //@ acess Private

 exports.updateAcademicTerm = AsyncHandler( async(req, res) =>{
    const {name,description,duration} = req.body
    //Check if name exist
    const createAcademicTermFound = await AcademicTerm.findOne({name})
    if(createAcademicTermFound){
        throw new Error("Academic term already exist")
    }
    const academicTerm = await AcademicTerm.findByIdAndUpdate(req.params.id,
         {
            name,
            description,
            duration,
            createdBy: req.userAuth._id
         },
         {
            new: true
         },
        );
   

    res.status(201).json({
        status: "Success",
        message: "Academic terms updated successfully",
        data: academicTerm,
    })
});


    ///@description Delete Academic term
 //@ rout PUT /api/v1/academic-terms/:id
 //@ acess Private

exports.deleteAcademicTerm = AsyncHandler( async(req, res) =>{
    
    const createAcademicTermFound = await AcademicTerm.findByIdAndDelete(req.params.id)
   await AcademicTerm.findByIdAndDelete(req.params.id);
   

    res.status(201).json({
        status: "Success",
        message: "Academic term deleted successfully",
        
    })
});