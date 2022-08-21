import { createSlice } from "@reduxjs/toolkit";




const postsReducer = createSlice({ 
    name : "posts",
    initialState : { posts : [] },
    reducers : {
      get_all_posts : (state, action) => {
        return {...state, posts : action.payload}
      },
       get_posts : (state, action) => {
         return {...state, posts : action.payload}
       },
       like_post : ( state, action ) => {
           const { posts } = state ;
           const newPosts = posts.map((post)=>{
                if(post._id === action.payload.postId){
                   return { ...post,  
                                 likers : [action.payload.userId, ...post.likers]    
                         }
                   }
                  return post ;
                    });

          return {...state, posts : newPosts } ;
       },
       unlike_post : ( state, action ) => {
         const { posts } = state ;
         const newPosts = posts.map((post)=>{
           if(post._id === action.payload.postId){
             return {
              ...post,
                  likers: post.likers.filter((id) => id !== action.payload.userId)
            }
          }
          return post;
        })
        return {...state, posts : newPosts } ;
       }
    }
})

export const selectPosts = (state) => state.postsReducer ;
export const { get_posts, like_post, unlike_post, get_all_posts } = postsReducer.actions ;

export default postsReducer.reducer ;