import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import Login from './Component/Login/Login'
import Home from './Component/Home/Home'
import Signup from './Component/Signup/Signup'

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Route path='/' exact component={Home} />
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Signup} />
        </BrowserRouter>
    </div>
  );
}

export default App;
