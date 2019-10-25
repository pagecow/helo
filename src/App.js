import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store';
import AuthPage from './Components/AuthPage';
import Dashboard from './Components/Dashboard';
import PostPage from './Components/PostPage';

function App() {
  return (
    <div className="App">
        <Provider store={store}>
        <Switch>
          <Route exact path='/' component={AuthPage}/>
          <Route path='/dashboard' component={Dashboard}/>
          <Route path='/post-page' component={PostPage}/>
        </Switch>
        </Provider>
    </div>
    
  );
}

export default App;
