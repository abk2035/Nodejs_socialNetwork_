
import rootReducer from '../reducers';
import { configureStore } from'@reduxjs/toolkit';
import { applyMiddleware } from "redux";



const Store = configureStore({
    reducer : rootReducer
   // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat( composeWithDevTools(applyMiddleware(thunk)) )
});

export default Store;