
const express = require("express");



// const adminRouter = require("../staff/AdminRouter");

const isAdmin = require("../../Midleware/isAdmin");
const isLogin = require("../../Midleware/isLogin");



const { createYearGroup, getYearGroups, getYearGroup, updateYearGroup, deleteYearGroup } = require("../../Controller/academics/yearGroup");

const yearGroupRouter = express.Router();

yearGroupRouter
.route('/')
.post(isLogin,isAdmin,createYearGroup)
.get(isLogin,isAdmin, getYearGroups);

yearGroupRouter
.route('/:id')
.get(isLogin,isAdmin, getYearGroup)
.put(isLogin,isAdmin, updateYearGroup)
.delete(isLogin,isAdmin, deleteYearGroup)



module.exports = yearGroupRouter;