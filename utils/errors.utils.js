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