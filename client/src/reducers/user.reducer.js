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
                  const { userData : { followers } } = state ;
                  const newFollowers = [...followers, action.payload];

                   return {...state, userData: {...state.userData,   followers : newFollowers } } 
               },

                unFollow_user : (state, action) => {
                  const { userData : { followers } } = state ;
                  const newFollowers = followers.filter( (id) => id !== action.payload.idToUnfollow );
                 
                  return {...state, userData: {...state.userData,   followers : newFollowers } } 

               }


             }

})

export const { get_user, upload_picture, update_bio, follow_user, unFollow_user } = userReducer.actions ;

export const selectUser = (state) => state.userReducer;

export default userReducer.reducer ;