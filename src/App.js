import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import {reactLocalStorage} from 'reactjs-localstorage';

import logo from './logo.svg';
import './App.css';
import Login from './Component/Login/Login'
import Home from './Component/Home/Home'
import Signup from './Component/Signup/Signup'

function App() {
  const [component, setComponent] = useState("")

  useEffect(() => {
    setComponent(reactLocalStorage.get('component'))
  }, [reactLocalStorage.get('component')])

  return (
    <div className="App">
      <Home />
      {/* { reactLocalStorage.get('component') == "home"? 
      :
        reactLocalStorage.get('component') == "login"?
          <Login />
        :
          <Signup />
      } */}
    </div>
  );
}

export default App;
