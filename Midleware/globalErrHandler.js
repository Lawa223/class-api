const express = require("express");
// const adminRouter = require("../Route/staff/adminRouter");
const globalErrHandler = (err,req,res,next)=>{

    //Status
//Message
//Stack

const stack = err.stack;
const message = err.message;
const status = err.status ? err.status : "failed";
const statusCoad = err.statusCoad ? err.statusCoad : 500
res.status(statusCoad).json({
    status,
    message,
    stack,
    
});
};
//Not found
const notFoundErr = (req,res,next)=>{
    const err = new Error(`cant find ${req.originalUrl} on the server`);
    next(err)
}

module.exports = {globalErrHandler ,notFoundErr};