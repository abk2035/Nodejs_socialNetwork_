import React , { useContext, useState }from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../reducers/user.reducer";
import LeftNav from "../LeftNav";
import UploadImg from "./UploadImg";
import { useDispatch } from "react-redux";
import { updateBio } from "../../actions/user.actions";
import { dateParser } from "../Utils";




const UpdateProfil = ()=>{

    const [bio, setBio] = useState("");
    const { userData }  = useSelector ( selectUser );
    const [updateForm, setUpdateForm] = useState(false);
    const dispatch = useDispatch() ;
    const [followingPopup, setFollowingPopup] = useState(false);
    const [followersPopup, setFollowersPopup] = useState(false);

    const handleUpdate = () => {
       dispatch( updateBio(userData._id, bio) );
       setUpdateForm( false );
      };

     return (
      <div className = "profil-container">
         <LeftNav />
         <h1> Profil de { userData.pseudo }</h1>
         <div className="update-container">
               <div className="left-part">
                    <h3>Photo de profil</h3>
                    <img src={ userData.picture } alt="user-pic" />
                    <UploadImg  /> 

               </div>
               <div className="right-part">
                  <div className="bio-update">
                    <h3>Bio</h3>
                    {updateForm === false && (
                    <>
                         <p onClick={ () => setUpdateForm( !updateForm ) }>{ userData.bio }</p>
                         <button onClick={() => setUpdateForm( !updateForm )}>
                           Modifier bio
                         </button>
                    </>
                    )}
                    {updateForm && (
                      <>
                         <textarea
                         type="text"
                         defaultValue={ userData.bio }
                         onChange={(e) => setBio( e.target.value )}
                         ></textarea>
                         <button onClick={ handleUpdate }>Valider modifications</button>
                      </>
                    )}
                  </div>
                    <h4>Membre depuis le : { dateParser( userData.updatedAt ) }</h4>
                    <h5 onClick={() => setFollowingPopup(true)}>
                      Abonnements : { userData.following ? userData.following.length : ""}
                    </h5>
                    <h5 onClick={() => setFollowersPopup(true)}>
                       Abonnés : { userData.followers ? userData.followers.length : ""}
                    </h5>
               </div>
          </div>
          {followingPopup && (
           <div className="popup-profil-container">
                  <div className="modal">
                         <h3>Abonnements</h3>
                         <span className="cross" onClick={ () => setFollowingPopup(false) }>
                           &#10005;
                         </span>
                         <ul>sdsds</ul>
                  </div>
           </div>
          )}



      </div> 
)}


export default UpdateProfil;