import axios from 'axios';
import React from 'react';
import cookie from 'js-cookie';

export default function Logout() {

  const logout = async()=>{
    const removeCookie = (key) => {
      if (window !== "undefined") {
        cookie.remove(key, { expires: 1 });
      }
    };

    await axios ({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    }).then(()=>removeCookie("jwt"))
      .catch((err)=> console.log(err));

      window.location="/";
  }
  
    return (
    <li onClick={ logout }>
      <img src="./img/icons/logout.svg" alt="logout" />
    </li>  
    )
}
