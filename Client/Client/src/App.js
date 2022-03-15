import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Navbar from './Component/Navbar';
import Fimage  from './Component/Fimage';
import Textarea  from './Component/Textarea';
import Footer from './Component/Footer';
import SearchFilter from './Component/SearchFilter';
import {BrowserRouter,Route} from "react-router-dom";
import Signup from './Component/Signup';
import Signin from './Component/Signin';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Fimage/>
    <Route exact path="/">
    <SearchFilter/>
    <Textarea/> 
    <Footer/>
    </Route>
    <Route path="/user/register">
      <Signup/>
    </Route>
    <Route path="/user/login">
      <Signin/>
    </Route>
    </BrowserRouter>
  );
}

export default App;
