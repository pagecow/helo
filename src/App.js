import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import AuthPage from './Components/AuthPage';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <div className="App">
        <Switch>
          <Route exact path='/' component={AuthPage}/>
          <Route path='/dashboard' component={Dashboard}/>
        </Switch>
    </div>
    
  );
}

export default App;
