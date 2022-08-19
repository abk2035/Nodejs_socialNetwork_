import React ,{ useContext } from 'react';
import { NavLink } from "react-router-dom";
import { UidContext } from './Routes/AppContext';
import Logout from "./Log/Logout";
import { useSelector } from 'react-redux';
import { selectUser } from '../reducers/user.reducer';




export default function Navbar() {
    const uid = useContext( UidContext );
    const { userData } = useSelector( selectUser ); 
    
  return (
    <nav>
      <div className="nav-container">

         <div className="logo">
            <NavLink exact to="/">
                <div className="logo">
                    <img src="./img/icon.png" alt="icon" />
                    <h3>Linked</h3>
                </div>
            </NavLink>
         </div>
         {
          uid?
           (
            <ul>
            <li></li>
            <li className="welcome">
              <NavLink exact to="/profil">
                <h5> Bienvenue { userData.pseudo} </h5>
              </NavLink>
            </li>
            <Logout />
          </ul>
           ):
           (
            <ul>
                <li></li>
                <li>
                    <NavLink exact to="/profil">
                        <img src="./img/icons/login.svg" alt="login"/>
                    </NavLink>
                </li>
           </ul>
           )
         }
      </div>
    </nav>
  )
}
