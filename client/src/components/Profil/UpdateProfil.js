import React , { useContext }from "react";
import { UidContext } from "../Routes/AppContext";


const UpdateProfil = ()=>{

   const uid =useContext(UidContext);


     return (
        <>UpdateProfil <i>{ uid }</i></>
     )
}


export default UpdateProfil;