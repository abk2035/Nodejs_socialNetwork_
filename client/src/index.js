import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import './styles/index.css';
import { Provider } from 'react-redux';
import Store from './app/store';
import getUsers from '../src/actions/users.actions'
import { getPosts } from '../src/actions/posts.actions'


Store.dispatch( getUsers() ) ;
Store.dispatch(getPosts());

ReactDOM.render(
<React.StrictMode>
      <Provider store={ Store }>
        <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
