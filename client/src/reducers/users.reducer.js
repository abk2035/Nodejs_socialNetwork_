import { createSlice } from '@reduxjs/toolkit';


export const usersReducer = createSlice({
    name: "users",
    initialState :{ usersData : []},
    reducers :{
        get_users : (state, action) => {
            return {...state, usersData : action.payload } ;
        }
    }

})

export const { get_users } = usersReducer.actions;
export const selectUsers = (state) => state.usersReducer;
export default usersReducer.reducer ;