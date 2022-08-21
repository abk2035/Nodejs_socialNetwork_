import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/posts.actions';
import { selectPosts } from '../reducers/posts.reducer';
import Card from './Post/Card';
import { isEmpty } from './Utils';

function Thread() {
 const [LoadPost, setLoadPost] = useState( true );
 const dispatch = useDispatch();
 const { posts } = useSelector( selectPosts );
 const [count, setCount]= useState(5) ;

 // even for scrollbar ;
 const loadMore = ()=>{
  if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight){
    setLoadPost(true);
  }
 }

  useEffect(() => {

    if( LoadPost ){
         dispatch( getPosts( count ) )
        setLoadPost(false);
        setCount(prev => prev + 5 )
    }

    window.addEventListener('scroll',loadMore)
    return () => window.removeEventListener('scroll',loadMore)
  } ,[LoadPost, dispatch, count]) 

  return (
    <div className="thread-container">
      <ul>
        { !isEmpty(posts[0]) &&
             posts.map((post) => {
              return <Card post={ post } key={ post._id } />;
            })
        }
      </ul>
  </div>
  )
}

export default Thread;