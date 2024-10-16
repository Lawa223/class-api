require("dotenv").config();
const http = require("http");
const app = require("./app/app")
require("./Config/dbConnect")



console.log(app);
const PORT = process.env.PORT || 7000



//server

const server = http.createServer(app)
server.listen (PORT, console.log(`server is running on port ${PORT}`));










// 
// const http = require("http")

// const app = require("./app/app");
//  const server = http.createServer(app);
// const PORT = process.env.PORT || 5050

// //Server

// server.listen(PORT, console.log(`server is running on port  ${PORT}`))
// const morgan = require ("moregan");







