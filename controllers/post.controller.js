const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;


module.exports.readPost= (req,res)=>{
    PostModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log("Error to get data : " + err);
      }).sort({ createdAt: -1 })
}

module.exports.createPost=async (req,res)=>{
    const newPost = new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
        video: req.body.video,
        likers: [],
        comments: [],
      });

      try {
        const post = await newPost.save();
        return res.status(201).json(post);
      } catch (err) { 
        return res.status(400).send(err);
      }    
}

module.exports.updatePost= (req,res)=>{
   if(!ObjectID.isValid(req.params.id))
   return res.satus(400).send("ID Unknow :" +req.params.id);

   const updatedRecord = {
    message: req.body.message,
  };

  PostModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err,docs)=>{
     if(!err) res.status(200).json(docs);
     else console.log("update error : " + err);
      }
    )

}

 

module.exports.deletePost= (req,res)=>{
    if(!ObjectID.isValid(req.params.id))
    return res.satus(400).send("ID Unknow :" +req.params.id);

    PostModel.findByIdAndDelete(
        req.params.id,
        (err,docs)=>{
         if(!err) res.send(docs);
        else console.log("delete Error"+ err) 
        }
    )
    
}

module.exports.likePost=async (req,res)=>{
    if(!ObjectID.isValid(req.params.id))
    return res.satus(400).send("ID Unknow :" +req.params.id);

  try {
    await PostModel.findByIdAndUpdate(
        req.params.id,
        {
          $addToSet: { likers: req.body.id },
        },
        { new: true },
      ).catch((err) => {
          console.log("error..")
        return res.status(400).send(err);
      });

      await UserModel.findByIdAndUpdate(
        req.body.id,
        {
          $addToSet: { likes: req.params.id },
        },
        { new: true },
      ).then((docs)=>{return res.status(200).send(docs)})
       .catch((err) => {
        return res.status(400).send(err);
      });

   }catch(err){
    console.log("erreur " +err)
    return res.status(400).send(err);
  }

}




module.exports.unlikePost= async (req,res)=>{
    if(!ObjectID.isValid(req.params.id))
    return res.satus(400).send("ID Unknow :" +req.params.id);


    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {
              $pull: { likers: req.body.id },
            },
            { new: true },
          ).catch((err) => {
              console.log("error..")
            return res.status(400).send(err);
          });
    
          await UserModel.findByIdAndUpdate(
            req.body.id,
            {
              $pull: { likes: req.params.id },
            },
            { new: true },
          ).then((docs)=>{return res.status(200).send(docs)})
           .catch((err) => {
            return res.status(400).send(err);
          });
    
       }catch(err){
        console.log("erreur dans unlike" +err)
        return res.status(400).send(err);
      }

}

module.exports.commentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);

    try{
        PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $push :{
                    comments:{
                        commenterId:req.body.commenterId,
                        commenterPseudo: req.body.commenterPseudo,
                        text: req.body.text,
                        timestamp: new Date().getTime()
                    }
                }
            },
            {new :true},
            (err,docs)=>{
                if(!err) return res.status(200).json(docs);
                else return res.status(400).send(err);
            }

        )
    }catch(err){ 

        console.log(err); 

        return res.status(400).send(err)
        
    }
    
}

module.exports.editCommentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
      
}

module.exports.deleteCommentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
}