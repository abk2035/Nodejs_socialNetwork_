
import axios from 'axios';
import { 
  get_user, 
  upload_picture,
  update_bio, 
  follow_user,
  unFollow_user } from '../reducers/user.reducer';



export const getUser = ( uid ) => async (dispatch) => {
      try {
        console.log("getUser executio...")
        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/user/${uid}`);
          console.log( res.data )  
        dispatch( get_user( res.data ) );
    } catch (err) {
        return console.log(err);
    }
};
 


export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
      .then((res) => {
      /*  if (res.data.errors) {
          dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_USER_ERRORS, payload: "" });*/
          return axios 
            .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
            .then((res) => {
              dispatch( upload_picture( res.data.picture ) );
            });
        
      })
      .catch((err) => console.log(err));
  };
};

export const updateBio = (userId, bio) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
      data: { bio },
    })
      .then((res) => {
        dispatch( update_bio( bio ) );
      })
      .catch((err) => console.log(err));
  };
};

export const followUser = (followerId, idToFollow) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/user/follow/`+followerId,
      data: { idToFollow }
    })
      .then((res) => {
        console.log("execute follow functio...")
        dispatch( follow_user( idToFollow ) );
      })
      .catch((err) => console.log(err));
  };
};

export const unfollowUser = (followerId, idToUnfollow) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/user/unfollow/`+followerId,
      data: { idToUnfollow }
    })
      .then((res) => {
        console.log("execute unfollow ")
        dispatch( unFollow_user( idToUnfollow ));
      })
      .catch((err) => console.log(err));
  };
};