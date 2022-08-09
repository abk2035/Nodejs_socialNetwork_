import React from "react";
import { useState } from "react";
import  axios from "axios";


const SigninForm = (props)=>{
  const [email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  
  const emailErrors=document.querySelector('.email.error');
  const passwordErrors= document.querySelector('.password.error');

    const  handleLogin = async (e)=>{
            e.preventDefault();
           
            try{
                    
                    let res =await axios.post(
                    `${process.env.REACT_APP_API_URL}api/user/login`,  
                     { email, password },
                     {headers:{"Content-Type" : "application/json"}}
                    );

                    if(res.data.errors){
                        emailErrors.innerHTML= res.data.errors.email;
                        passwordErrors.innerHTML= res.data.errors.password;

                    }else{
                        window.location='/';
                    }

                }catch(error){
                    console.log("erreur "+ error);
                   }
            
    }

    return (

        <form action="" onSubmit={ handleLogin } id="sign-up-form">
            <label htmlFor="email">Email</label>
            <br/> 
            <input 
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            />
            <div className="email error"></div>
            <br/>
            <label htmlFor="password">mot de passe </label>
            <br/>
            <input 
            type="text"
            name="password"
            id="password"
            value={ password }
            onChange={(e)=> setPassword(e.target.value)}
            />
            <div className="password error"></div>
            <br/>
            <input type="submit" value="Se connecter" />
        </form>
    )

}


export default SigninForm;