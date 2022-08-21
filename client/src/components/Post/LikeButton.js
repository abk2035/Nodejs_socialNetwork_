import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UidContext } from "../Routes/AppContext";
import { likePost, unlikePost} from "../../actions/posts.actions";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";


const LikeButton = ({ post }) => {

    const [liked, setLiked] = useState( false );
    const uid = useContext( UidContext );
    const dispatch = useDispatch();

   const like  = () =>{
     if( uid !== 0  ) { 
        dispatch( likePost(post._id,uid) ) ;
        setLiked( true ) ;}
   }

   const unlike  = () =>{
    if( uid !== 0 ) { 
        dispatch( unlikePost(post._id,uid) ) ;
        setLiked( false ) ;
      }
 }

useEffect(() => {
    if (post.likers.includes(uid)) setLiked( true );
    else setLiked( false );
  }, [uid, post.likers, liked] );

return (
<>
   <div className="like-container">
     {(uid === 0) && (
         <Popup
           trigger={<img src="./img/icons/heart.svg" alt="like" />}
           position={["bottom center", "bottom right", "bottom left"]}
           closeOnDocumentClick
         >
           <div>Connectez-vous pour aimer un post !</div>
         </Popup>
     )}
       { (uid !== 0) && liked === false && (
        <img src="./img/icons/heart.svg" onClick={ like } alt="like" />
      )}
      { (uid !== 0) && liked && (
        <img src="./img/icons/heart-filled.svg" onClick={ unlike } alt="unlike" />
      )}
     <span>{ post.likers.length }</span> 

   </div>

</>
);}

export default LikeButton ;