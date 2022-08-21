import React,{ useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectPosts } from '../../reducers/posts.reducer';
import { selectUsers } from '../../reducers/users.reducer';
import { selectUser } from '../../reducers/user.reducer';
import { isEmpty, dateParser } from "../Utils";
import  FollowHandler  from "../Profil/FollowHandler";
import LikeButton from "../Post/LikeButton";

function Card({ post }) {

 const [isLoading,setIsLoading] = useState(true);
 const { usersData } = useSelector( selectUsers );
 const { userData } = useSelector( selectUser );
 const [showComments , setShowComments] = useState ( false );
 const dispatch = useDispatch();

 useEffect(() => {
  setTimeout(()=>{
    return !isEmpty(usersData[0]) && setIsLoading( false );
  },3000)
  
}, [usersData]);

  return (
    <li className="card-container" key={ post._id }>
      { isLoading ?
       ( <i className="fas fa-spinner fa-spin"></i>
        ) :  (
          <>
             <div className="card-left">
                <img src={
                  !isEmpty( usersData[0] ) &&
                   usersData.map((user) => {
                     if ( user._id === post.posterId ) return user.picture ;
                     else return null ;
                   }).join("")  
                  }
                  alt="poster-pic"
                 />
             </div>
             <div className="card-right">
                <div className="card-header">
                    <div className="pseudo"> 
                        <h3>
                          {!isEmpty(usersData[0]) &&
                            usersData
                              .map((user) => {
                                if (user._id === post.posterId) return user.pseudo;
                                else return null;
                              }).join("")}
                        </h3>
                        {post.posterId !== userData._id && (
                           <FollowHandler idToFollow={post.posterId} type = {"card"} />
                        )}
                    </div>
                    <span>{ dateParser(post.createdAt) }</span> 
                </div>
                <p>{ post.message }</p>
                 {post.picture && (
                   <img src={post.picture} alt="card-pic" className="card-pic" />
                 )}
                  {post.video && (
                    <iframe
                      width="500"
                      height="300"
                      src={post.video}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={post._id}
                    ></iframe>
                  )}
                  <div className="card-footer">
                    <div className="comment-icon">
                      <img
                        onClick={() => setShowComments(!showComments)}
                        src="./img/icons/message1.svg"
                        alt="comment"
                      />
                      <span>{post.comments.length}</span>
                    </div>
                    <LikeButton post={ post }/>
                    <img src="./img/icons/share.svg" alt="share" />
                </div>
             </div>
           </>
        )       
    }
    </li>
  )
}

export default Card;