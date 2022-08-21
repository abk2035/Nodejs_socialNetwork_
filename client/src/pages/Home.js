import React from 'react';
import LeftNav from '../components/LeftNav';
import Trends from '../components/Trends';
import Thread from '../components/Thread';


const Home= ()=>{



  return(
    <div className="home">
      <LeftNav />
      <div className="main">
         <Thread/>
      </div>
      <div className="right-side">
        <div className="right-side-container">
           <div className="wrapper">
            <Trends />
           </div>
        </div> 
       </div>
    </div>
  );
}





export default Home;
