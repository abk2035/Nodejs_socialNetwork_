import { get_user, upload_picture,update_bio } from '../reducers/user.reducer';
import axios from 'axios';



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