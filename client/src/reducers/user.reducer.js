import { createSlice } from '@reduxjs/toolkit';


export const userReducer = createSlice({
    name: "user",
    initialState :{ userData : {} },
    reducers:{
                get_user : (state,  action) => {
                   state = {...state ,userData : action.payload } ;
                   return state ; 
                  } ,
                upload_picture : (state, action) => {
                  const { userData } = state ;
                  const newUser = {...userData, picture : action.payload}
                  return { ...state, userData : newUser }
                },
                update_bio : (state,action) => {
                  const { userData } = state ;
                  const newUser = {...userData, bio : action.payload}
                  return { ...state, userData : newUser }
                },
                follow_user : (state,action) => {
                  const { userData : { following } } = state ;
                  const newFollowing = [...following, action.payload];

                   return {...state, userData: {...state.userData,   following : newFollowing } } 
               },

                unFollow_user : (state, action) => {
                  const { userData : { following } } = state ;
                  const newFollowing = following.filter( (id) => id !== action.payload );
                 
                  return {...state, userData: {...state.userData,   following : newFollowing } } 

               }

             }

})

export const { get_user, upload_picture, update_bio, follow_user, unFollow_user } = userReducer.actions ;

export const selectUser = (state) => state.userReducer;

export default userReducer.reducer ;