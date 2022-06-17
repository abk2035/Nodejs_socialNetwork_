const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minLength: 6
    },
    picture: {
      type: String,
      default: "./uploads/profil/random-user.png"
    },
    bio :{
      type: String,
      max: 1024,
    },
    followers: {
      type: [String]
    },
    following: {
      type: [String]
    },
    likes: {
      type: [String]
    }
  },
  {
    timestamps: false,
  }
);
//
userSchema.plugin(uniqueValidator);
// play function before save 
userSchema.pre('save',async function(next) {
     const salt = await bcrypt.genSaltSync(10); 
     this.password= bcrypt.hashSync(this.password,salt);
     next();
});

userSchema.statics.login= async function(email , password){
  
  const user = await this.find({ email },(err,docs)=>{if(docs) return docs });
                                
  console.log("user is :"+user);
   if(!user==null){
     const auth = await bcrypt.compareSync(password,user.password);
     if(auth){
      console.log("execution de login function");
       return user ;
     } throw  new Error("incorrect password")

   }throw  new Error("incorrect email") 

}


const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel; 