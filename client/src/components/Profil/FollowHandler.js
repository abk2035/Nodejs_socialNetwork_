import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../actions/user.actions";
import { selectUser } from "../../reducers/user.reducer";
import { isEmpty } from "../Utils";

const FollowHandler = ({ idToFollow, type }) => {
  const { userData } = useSelector( selectUser );
  const [isFollowed, setIsFollowed] = useState( false );
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch( followUser(userData._id.trim(), idToFollow) );
    setIsFollowed(true);
  };

  const handleUnfollow = () => {
    console.log(userData._id)
    dispatch( unfollowUser(userData._id.trim(), idToFollow) );
    setIsFollowed(false);
  };

  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        setIsFollowed(true);
      } else setIsFollowed(false);
    }
  }, [userData, idToFollow]);

  return (
    <>
      {isFollowed && !isEmpty(userData) && (
        <span onClick={ handleUnfollow }>
          {type === "suggestion" && <button className="unfollow-btn">Abonné</button>}
          {type === "card" && <img src="./img/icons/checked.svg" alt="checked"/>}
        </span>
      )}
      {isFollowed === false && !isEmpty(userData) && (
        <span onClick={ handleFollow }>
          {type === "suggestion" && <button className="follow-btn">Suivre</button>}
          {type === "card" && <img src="./img/icons/check.svg" alt="check"/>}
        </span>
      )}
    </>
  );
};

export default FollowHandler;
