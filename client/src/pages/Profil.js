import React from 'react';
import Log from '../components/Log'
import { useContext } from 'react';
import { UidContext } from '../components/Routes/AppContext';
import UpdateProfil from '../components/Profil/UpdateProfil';



const Profil = ()=>{
 const uid =useContext(UidContext);


  return(
    <div className="profil-page">
      {
        uid ?
         (<UpdateProfil/>):
      
      ( <div className="log-container">
           <Log signin={false} signUp={true}/>
           <div className='img-container'>
               <img src="./img/log.svg" alt="img-logo"/>
           </div>
       </div>
       )}
    </div>
  );
}





export default Profil;