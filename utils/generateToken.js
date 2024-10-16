const jwt = require("jsonwebtoken");

const generateToken = (id) => {
   return jwt.sign({id}, "anykey", {expiresIn: "7d"})
};

module.exports = generateToken;