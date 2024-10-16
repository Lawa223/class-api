const express = require("express");
// const morgan = require("morgan");
const {globalErrHandler,notFoundErr} = require("../Midleware/globalErrHandler")


// const programRouter = require("../Route/academicss/programRouter")
// const adminRouter = require("../Route/staff/adminRouter");
// const academicYearRouter = require("../Route/academicss/academicYearRouter");
// const academicTermRouter = require("../Route/academicss/academicTermRouter");
// const ClassLevel = require("../Route/Academicss/ClassLevelRouter");
// const questionsRouter = require("../Route/academicss/questionRouter")
// const subjectRouter = require("../Route/academicss/subjectRouter");
// const yearGroupRouter = require("../Route/academicss/yearGroupRouter");
// const teachersRouter = require("../Route/staff/teachersRouter");
// const examRouter = require("../Route/academicss/examRouter");
// const studentRouter = require("../Route/staff/studentRouter");
// const examResultRouter = require("../Route/academicss/examResultsRouter");
const programRouter = require("../Route/academicss/program");
const academicYearRouter = require("../Route/academicss/academicYear");
const classLevelRouter = require("../Route/academicss/classLevel");
const academicTermRouter = require("../Route/academicss/academicTerm");
const subjectRouter = require("../Route/academicss/subjects");
const yearGroupRouter = require("../Route/academicss/yearGroups");
const teachersRouter = require("../Route/staff/teachers");
const studentRouter = require("../Route/staff/students");
const examRouter = require("../Route/academicss/examRoute");
const quetionsRouter = require("../Route/academicss/questionRoutes");
const examResultRouter = require("../Route/academicss/examResultsRout");
const adminRouter = require("../Route/staff/AdminRouter");

const app = express();

//  Middlewares
// app.use(morgan("dev"));
app.use(express.json())///pass incoming json
// app.use((req, res, next)=>{
//  console.log(`${req.method} ${req.originalUrl}`);
//  next();
// });



// let user = {
//     name: "John Does",
//     isAdmin: false,
//     isLogin: true,
// };

// const isLogin = (req, res, next)=>{
//     if(isLogin){
//         next()
//     }else{
//         res.status(401).json({
//             msg: "Unauthorized"
//         })
//     }
// };

// const isAdmin = (req, res, next)=>{
//     if(user.isAdmin){
//         next()
//     }else{
//         res.status(401).json({
//             msg: "Unauthorized, you are not admin"
//         })
//     }
// };
// app.use(isAdmin);
//Routes
// app.use("/api/v1/admins",adminRouter)
//Admin Register
app.use('/api/v1/admins',adminRouter);
app.use("/api/v1/academic-years", academicYearRouter)
app.use("/api/v1/academic-terms", academicTermRouter)
app.use("/api/v1/class-levels", classLevelRouter)
app.use("/api/v1/programs", programRouter)
app.use("/api/v1/subjects", subjectRouter)
app.use("/api/v1/year-groups", yearGroupRouter)
app.use("/api/v1/teachers", teachersRouter)
app.use("/api/v1/students", studentRouter)
app.use("/api/v1/exams", examRouter)
app.use("/api/v1/questions", quetionsRouter)
app.use("/api/v1/exam-results", examResultRouter);
//Error MidleWare
// app.use()


//Error Midlewares
app.use(notFoundErr)
app.use(globalErrHandler);










// app.use("/me", (req,res)=> {
//     res.json({
//         msg: "I will always be good"
//     })
// })
// //Admin
// app.post('api/v1/admins/register', (req, res)=>{
//   try {
//     res.status(201).json({
//         status: "Success",
//         data: 'Admin has been registered'
//     })
//   } catch (error) {
//     res.json({
//         status: 'Failed',
//         error: error.message,
//     })
//   }
// });


// //Admin login
// app.post('api/v1/admins/login',);

  
// //Get all Admins
// app.get('api/v1/admin/admins',);

    
// //Get single Admin
// app.get('api/v1/admin/admins/:id',);

    
// //Update Admins
// app.put('api/v1/admin/admins/:id',);

    
// //Delete Admins
// app.delete('api/v1/admin/admins/:id',);

//   // Admin Suspending  Teacher
// app.put('api/v1/admin/admins/suspend/teacher:id',);

  
//   // Admin UnSuspending  Teacher
// app.put('api/v1/admin/admins/unsuspend/teacher:id',);

  
//   // Admin Withdrawing  Teacher
// app.put('api/v1/admin/admins/withdraw/teacher:id', );

//     // Admin UnWithdrawing  Teacher
// app.put('api/v1/admin/admins/unwithdraw/teacher:id',);

//     // Admin Publish exam results  Teacher
// app.put('api/v1/admin/admins/publish/exam:id', );

//      // Admin UnPublish exam results  Teacher
// app.put('api/v1/admin/admins/unpublish/exam:id',);




module.exports = app;