const UserModel= require('../models/user.model')


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