
import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import usersReducer from './users.reducer';
import postsReducer from './posts.reducer';


 const rootReducer = combineReducers ({
    userReducer,
    usersReducer,
    postsReducer
}
);



export default rootReducer;