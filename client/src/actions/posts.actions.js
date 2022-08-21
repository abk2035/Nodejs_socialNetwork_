import { 
 get_posts,
 like_post, 
 unlike_post, 
 get_all_posts,
 update_post } from "../reducers/posts.reducer";
import axios from "axios";



export const getPosts = (num) => {
    return (dispatch) => {
      return axios
        .get(`${process.env.REACT_APP_API_URL}api/post/`)
        .then((res) => {
          const array = res.data.slice(0, num);
          // dispatch({ type: GET_POSTS, payload: array });
           dispatch( get_posts( res.data ) );
           dispatch( get_all_posts( array ) );
        })
        .catch((err) => console.log(err));
    };
  };

  export const likePost = (postId, userId) => {
    return (dispatch) => {
      return axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/post/like-post/` + postId,
        data: { id: userId },
      })
        .then((res) => {
          dispatch( like_post( { postId, userId } ) );
        })
        .catch((err) => console.log(err));
    };
  };

  export const unlikePost = (postId, userId) => {
    return (dispatch) => {
      return axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/post/unlike-post/` + postId,
        data: { id: userId },
      })
        .then((res) => {
          dispatch( unlike_post({ postId, userId }) );
        })
        .catch((err) => console.log(err));
    };
  };

  export const updatePost = (postId, message) => {
    return (dispatch) => {
      return axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
        data: { message },
      })
        .then((res) => {
          dispatch( update_post( { message, postId } ));
        })
        .catch((err) => console.log(err));
    };
  };