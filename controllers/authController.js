const UserModel= require('../models/user.model')
const jwt = require('jsonwebtoken'); 


const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id)=>{
      console.log("create toke");
      return jwt.sign({id}, process.env.SECRET_TOKEN ,{expiresIn:maxAge})
}




module.exports.signUp= async (req,res)=>{
  const{pseudo,email,password}=req.body;
      const newUser ={
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: req.body.password
      }

      //console.log(req.body)
      try {
            const user= await UserModel.create(newUser);
            res.status(201).json({user: user._id});
      }catch(err){
      res.status(200).send({err});
      console.log("erreur " + err);
      }
}

module.exports.signIn = async(req,res)=>{
      const{email,password}=req.body ;
      try{ 
            const user = await UserModel.login(email,password);
            const token = createToken(user._id);
            res.cookie('jwt', token,{httpOnly:true,maxAge:maxAge});

           return  res.status(200).json({user :user._id});
      }catch(err){
            return res.status(200).json({message:err})
      }

}

module.exports.logout=(req,res)=>{
      res.cookie("jwt", "",{maxAge:1});
      res.redirect("/");
      console.log('user disconnected');
}