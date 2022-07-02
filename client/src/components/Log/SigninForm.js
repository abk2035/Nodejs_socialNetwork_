import React from "react";
import { useState } from "react";
import axios, { Axios } from "axios";


const SigninForm = (props)=>{
  const [email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  
  const emailErrors=document.querySelector('.email.error');
  const passwordErrors= document.querySelector('.password.errors');

    const handleLogin =(e)=>{
            e.preventDefault();
           
            axios({
                method:"post",
                url:process.env.REACT_APP__API_URL+"api/user/login",
                withCredentials:true,
                data:{
                    email,
                    password
                }
            }).then((res)=>{
                console(res);
                if(res.data.errors){
                    emailErrors.innerHTML=res.data.errors.email;
                    passwordErrors.innerHTML=res.data.errors.password;

                }else{
                    window.location='/';
                }
            }).catch((err)=>console.log(err))
          


    }

    return (

        <form action="" method="" onSubmit={handleLogin}>
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
            <label htmlFor="passWord">mot de passe </label>
            <br/>
            <input 
            type="text"
            name="password"
            id="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            />
            <div className="password error"></div>
            <br/>
            <input type="submit" value="Se connecter"/>
        </form>
    )

}


export default SigninForm;