const jwt = require("jsonwebtoken");
const UserModel=require('../models/user.model');


module.exports.checkUser= (req,res,next)=>{
console.log('startSessio....')
try{
    const token = req.cookies.jwt;
    jwt.verify(token,process.env.SECRET_TOKEN,async (err,decodedToken)=>{
     if(err){
        console.log("pas de toke...");
         res.locals.user=null;
         res.cookie("jwt",'',{maxAge:1});
         
         next();
     }else{
         console.log('user have toke....')
         user = await UserModel.findById(decodedToken.id);
         res.locals.user=user;
         console.log(res.locals.user);
         next();
     }
    })
   }catch(err){
       res.local.user=null;
       next();
   }

};

module.exports.requireAuth= (req,res,next)=>{


console.log("start authRequire..");

     const token = req.cookies.jwt;
    if(token){
     jwt.verify(token,process.env.SECRET_TOKEN,(err,decodedToken)=>{
         if(err){
             console.log("erreur....");
         }else{
             console.log("success...")
             next();
         }
      })
    }else{
    console.log('No token'); 
  }


}