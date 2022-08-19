
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Routes from '../src/components/Routes'
import { getUser } from './actions/user.actions';
import { UidContext } from './components/Routes/AppContext';

const App = ()=>{
  const [uid,setUid]=useState(null);
  const dispatch = useDispatch();
  useEffect(
  ()=>{
   const fetchToken= async ()=>{
          await axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}jwtid`,
            withCredentials: true,
          }).then((res)=>{
              setUid(res.data);
          }).catch( (err) => console.log("No Token client" +err) );
   }

   fetchToken();

   if(uid) dispatch( getUser( uid ) )
  },[uid,dispatch])

  return(
    <UidContext.Provider value={ uid }>
      <Routes/>
    </UidContext.Provider>
  );
}





export default App;
