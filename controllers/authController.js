const UserModel= require('../models/user.model')
const jwt = require('jsonwebtoken'); 
const{signUpErrors} = require('../utils/errors.utils');
const {signInErrors}= require('../utils/errors.utils');

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
      const errors = signUpErrors(err.errors);
      res.status(200).send(errors);
      console.log("erreur " + Object.keys(err.errors).includes('pseudo'));
      }
}

module.exports.signIn =async (req,res)=>{
      const{email,password}=req.body ;
      try{ 
            const user = await UserModel.login(email,password);
            const token = createToken(user._id);
            res.cookie('jwt', token,{httpOnly:true,maxAge:maxAge});

           return  res.status(200).json({user :user._id});
      }catch(err){
            console.log('erreur...')
            const errors= signInErrors(err);
            return res.status(500).json({errors}); 
            
      }

}

module.exports.logout=(req,res)=>{
      res.cookie("jwt", "",{maxAge:1});
      res.redirect("/");
      console.log('user disconnected');
}