import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import AuthPage from './Components/AuthPage';
import Dashboard from './Components/Dashboard';
import {Provider} from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <div className="App">
        <Provider store={store}>
        <Switch>
          <Route exact path='/' component={AuthPage}/>
          <Route path='/dashboard' component={Dashboard}/>
        </Switch>
        </Provider>
    </div>
    
  );
}

export default App;
