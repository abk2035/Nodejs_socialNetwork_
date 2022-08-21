import { get_posts, like_post, unlike_post, get_all_posts } from "../reducers/posts.reducer";
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