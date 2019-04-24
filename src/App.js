import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'; 
import LogInForm from './component/LogInForm.js';
import SignUpForm from './component/signUpForm.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' component={SignUpForm} />
        <Route path='/log-in' component={LogInForm} />
        <Route path='/sign-up' component={SignUpForm} />
        {/* <Route path='/cart' component={Cart} */}
      {/* <Route path='/order-summary' component={OrderSummary} */}
      </div>
    );
  }
}

export default App;
