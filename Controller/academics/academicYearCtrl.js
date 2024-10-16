const AsyncHandler = require("express-async-handler");
const AcademicYear = require("../../Model/Academic/AcademicYear");
const Admin = require("../../Model/Staff/Admin");
const AcademicTerm = require("../../Model/Academic/AcademicTerm");


 ///@description create Academic years
 //@ rout POST /api/v1/academicyears
 //@ acess Private
exports.createAcademicYear = AsyncHandler( async(req, res) =>{
    const {name,fromYear,toYear} = req.body
    //Check if exists
    const academicYear = await AcademicYear.findOne({name});
    if(academicYear){
        throw new Error("Academic year already exists")
    }
      //create
       const academicYearCreated = await AcademicYear.create({
        name,
        fromYear,
        toYear,
        createdBy: req.userAuth._id,
       })

    res.status(201).json({
        status: "Success",
        message: "Academic year created successfully",
        data: academicYearCreated,
    });

    //push academic into admin
    const admin = await Admin.findById(req.userAuth._id);
    admin.academicYears.push(academicYearCreated._id)
    await admin.save();
});

///@description get All Academic term
 //@ rout GET /api/v1/academic-terms
 //@ acess Private
exports.getAcademicYears = AsyncHandler( async(req, res) =>{
    
    const academicYears = await AcademicYear.find();

   

    res.status(201).json({
        status: "Success",
        message: "Academic years fetched successfully",
        data: academicYears,
    })
});

///@description Single Academic year
 //@ rout GET /api/v1/academic-years/:id
 //@ acess Private
 exports.getAcademicYear = AsyncHandler( async(req, res) =>{
   
    const academicYears = await AcademicYear.findById(req.params.id);
   

    res.status(201).json({
        status: "Success",
        message: "Academic year fetched successfully",
        data: academicYears,
    })
});

///@description Update Academic year
 //@ rout PUT /api/v1/academic-years/:id
 //@ acess Private

 exports.updateAcademicYear = AsyncHandler( async(req, res) =>{
    const {name,fromYear,toYear} = req.body
    //Check if name exist
    const createAcademicYearFound = await AcademicYear.findOne({name})
    if(createAcademicYearFound){
        throw new Error("Academic year already exist")
    }
    const academicYear = await AcademicYear.findByIdAndUpdate(req.params.id,
         {
            name,
            fromYear,
            toYear,
            createdBy: req.userAuth._id
         },
         {
            new: true
         },
        );
   

    res.status(201).json({
        status: "Success",
        message: "Academic years updated successfully",
        data: academicYear,
    })
});

///@description Delete Academic year
 //@ rout PUT /api/v1/academic-years/:id
 //@ acess Private

 
 exports.deleteAcademicYear = AsyncHandler( async(req, res) =>{
    
    const createAcademicYearFound = await AcademicYear.findByIdAndDelete(req.params.id)
   await AcademicYear.findByIdAndDelete(req.params.id);
   

    res.status(201).json({
        status: "Success",
        message: "Academic year deleted successfully",
        data: createAcademicYearFound,
    })
});