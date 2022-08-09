module.exports.signUpErrors= (err)=>{
    let errors={};

  if(Object.keys(err).includes('pseudo')){
      if(err.pseudo['kind']== 'unique') errors.pseudo="Pseudo deja pris"; 
      if(err.pseudo['kind']== 'required') errors.pseudo=" le pseudo est obligatoire"; 
    }

  if(Object.keys(err).includes('email')){
        if(err.email['kind']== 'unique'|| err.email['kind']== 'user defined') errors.email="email incorrect ou deja pris"; 
        if(err.email['kind']== 'required') errors.email=" email est obligatoire"; 
      }

  if (Object.keys(err).includes('password'))
    errors.password = "Le mot de passe doit faire 6 caractères minimum";
   
    return errors;
}

// error for signIn
module.exports.signInErrors = (err) => {
  let errors = { email:'',password:'' }

  if (err.message.includes("incorrect email")) 
    errors.email = "Email inconnu";
  
  if (err.message.includes("incorrect password"))
    errors.password = "Le mot de passe ne correspond pas"

  return errors;
}



//error for upload 
module.exports.uploadErrors = (err) => {
  let errors = {};

  if (err.message.includes('Images Only'))
    { 
      errors.format = "Format incompatabile";
    }else{
      errors.maxSize = "Le fichier dépasse 1MB";
    }
    return errors
}