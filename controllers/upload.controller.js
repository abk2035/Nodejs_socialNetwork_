const UserModel = require("../models/user.model");
const ObjectID= require("mongoose").Types.ObjectId;
//const fs = require("fs");
const multer = require ('multer');
//const{promisify}=require("util");
//const pipeline = promisify(require('stream').pipeline);
const { uploadErrors } = require("../utils/errors.utils");

module.exports.uploadProfil= async(req,res ,next)=>{
       //let fileName = "";
    //setting of multer storage
    const Storage = multer.diskStorage(
        {
        destination: './client/public/uploads/profil',
        filename: (req,file,cb)=>{
           cb (null,file.originalname)
        }
      });
    //setting of multer filter
   // this code goes inside the object fileFilter passed to multer()
    function checkfiletype ( file, cb) {    
        // Allowed ext
        const filetypes = /jpeg|jpg|png|gif/;
    
    // Check ext
        const extname =  filetypes.test(file.originalname.toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    
    if(mimetype && extname){
         cb(null,true);
      } else {
        cb(new Error('Images Only'));
      }
    }
    const upload= multer({storage:Storage,
                          fileFilter: function(reqq,file,cb){ checkfiletype(file,cb) ;},
                          limits : {fileSize:1000000}	         
                           }).single('file');  
    
    upload(req,res ,(err) => {
        //fileName = req.body.name + ".jpg";       
        if(err) {
         const errors= uploadErrors(err);
         return res.status(400).json({errors});
        }
        console.log(req.file.originalname);
        next();
      }); 


  
   
    }
    /*try{
        console.log(req.file)
        if (req.file.mimetype != "image/jpg" &&
            req.file.mimetype != "image/png" &&
            req.file.mimetype != "image/jpeg"
        ) throw Error( "invalid file");

        if(req.file.size > 500000)throw Error( "max size");
    }catch(err){
        const errors = uploadErrors(err)
        return res.status(400).json(errors); 
    }*/


module.exports.uploadImageInDB= (req,res)=>{
    if(!ObjectID.isValid(req.body.userId))
    return res.status(400).send("ID unknow : "+req.body.userId);
     
        try{
        UserModel.findByIdAndUpdate(
            req.body.userId,
            { $set : {picture: "./uploads/profil/" + req.file.originalname}},
            { new:true, upsert:true, setDefaultsOnInsert : true },
            (err,docs) => {
                if(!err) return res.send(docs);
                else return res.status(500).send(err);
            }
            )
        }catch (err) {

            return res.status(500).send({ message: err }); 
        }
 }


 // upload image of post

 module.exports.uploadPost= async(req,res ,next)=>{

        //setting of multer storage
    const Storage = multer.diskStorage(
        {
        destination: './client/public/uploads/posts',
        filename: (req,file,cb)=>{
            cb (null, Date.now()+"-" + file.originalname )
        }
    });
    //setting of multer filter
    
    // this code goes inside the object fileFilter passed to multer()
    function checkfiletype ( file, cb) {    
        // Allowed ext
        const filetypes = /jpeg|jpg|png|gif/;
    
    // Check ext
        const extname =  filetypes.test(file.originalname.toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    
    if(mimetype && extname){
        cb(null,true);
    } else {
        cb(new Error('Images Only'));
    }
    }
    const upload= multer({storage:Storage,
                        fileFilter: function(reqq,file,cb){ checkfiletype(file,cb) ;},
                        limits : {fileSize:1000000}	         
                            }).single('file');  
    
    upload(req,res ,(err) => {
        if(err) {
        const errors= uploadErrors(err);
        return res.status(400).json({errors});
        }
        console.log(req.file);
        next();
    }); 

 }