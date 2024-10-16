const AsyncHandler = require("express-async-handler");
const Admin = require("../../Model/Staff/Admin");
const YearGroup = require("../../Model/Academic/yearGroup");

// const yearGroup = require("../../Model/Academic/yearGroup");
// const Program = require("../../Model/Academic/program");
// const Subject = require("../../Model/Academic/Subjects");


 ///@description create year group
 //@ rout POST /api/v1/year-groups
 //@ acess Private
exports.createYearGroup = AsyncHandler( async(req, res) =>{
    const {name,academicYear} = req.body
   
    //Check if exists
    const yearGroups = await YearGroup.findOne({name});
    if(yearGroups){
        throw new Error("Year Group/Graduation year already exists")
    }
      //create
       const yearGroup = await YearGroup.create({
        name,
        academicYear,
        createdBy: req.userAuth._id,
       })

       //push to the program
       //find the Admmin
       const admin = await Admin.findById(req.userAuth._id)
        if(!admin){
            throw new Error("Admin not found") 
        }
        //push year group into admin
        admin.yearGroups.push(yearGroup._id)
       //save
       await programFound.save();

    res.status(201).json({
        status: "Success",
        message: "Year Group created successfully",
        data: yearGroup,
    });

  
});



///@description get All year groups
 //@ rout GET /api/v1/year-groups
 //@ acess Private
 exports.getYearGroups = AsyncHandler( async(req, res) =>{
    const groups = await YearGroup.find();
    res.status(201).json({
        status: "Success",
        message: "Year Groups fetched successfully",
        data: groups,
    })
});



///@description Single year group
 //@ rout GET /api/v1/year-group/:id
 //@ acess Private
 exports.getYearGroup = AsyncHandler( async(req, res) =>{
   
    const group = await YearGroup.findById(req.params.id);
   

    res.status(201).json({
        status: "Success",
        message: "Year group  fetched successfully",
        data: group,
    })
});


///@description Update year group
 //@ rout PUT /api/v1/year-grouups/:id
 //@ acess Private

 exports.updateYearGroup = AsyncHandler( async(req, res) =>{
    const {name,academicYear} = req.body
    //Check if name exist
    const yearGroupFound = await YearGroup.findOne({name})
    if(yearGroupFound){
        throw new Error("Year Group already exist")
    }
    const yearGroup = await YearGroup.findByIdAndUpdate(req.params.id,
         {
            name,
            academicYear,
            createdBy: req.userAuth._id
         },
         {
            new: true
         },
        );
   

    res.status(201).json({
        status: "Success",
        message: "Year Group updated successfully",
        data: yearGroup,
    })
});


    ///@description Delete year group
 //@ rout PUT /api/v1/year-groups/:id
 //@ acess Private

exports.deleteYearGroup = AsyncHandler( async(req, res) =>{
   await YearGroup.findByIdAndDelete(req.params.id);
   

    res.status(201).json({
        status: "Success",
        message: "Year group deleted successfully",
        
    })
});