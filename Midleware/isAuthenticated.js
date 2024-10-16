const verifyToken = require("../utils/verifyToken");


const isAuthenticated = (model) =>{
    return async (req, res, next)=>{
        //Get token from the Header
        const headerObj = req.headers
       
        const token = headerObj?.authorization?.split(" ")[1];
       //  const token = headerObj.authorization && headerObj.authorization.split(" ")[1];
       
         //Verify Token
        const  verifiedToken = verifyToken(token)
       
        if(verifiedToken){
       //Find the admin
         const user = await model.findById(verifiedToken.id).select("name email role")
         //Save the user into req.obj
         req.userAuth = user;
         next()
         return verifiedToken;
        }else{
         const err = new Error("Token expire/Invalid");
         next(err)
        }
       
        
       };
};

module.exports = isAuthenticated;