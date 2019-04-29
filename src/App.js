import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'; 
import LogInForm from './component/LogInForm.js';
import SignUpForm from './component/signUpForm.js';
import BrowseProducts from './component/browseProducts.js';
import OrderSummary from './component/orderSummary.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' component={BrowseProducts} />
        <Route path='/log-in' component={LogInForm} />
        <Route path='/sign-up' component={SignUpForm} />
        <Route path='/cart' component={BrowseProducts}/>
      <Route path='/order-summary' component={ OrderSummary } />
      </div>
    );
  }
}

export default App;
