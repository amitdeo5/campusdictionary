import React, { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns'
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
import AddCollege from './Component/AddCollege';
import Forbidden from './Component/Forbidden';
import Map from './Component/Map';
import CollegeDash from './Component/CollegeDash';
import { ScheduleMeet } from './Component/ScheduleMeet';
import EmailVerify from "./Component/EmailVerify";

function App() {
  const roleOfUser=localStorage.getItem('user')==='HR';
  const Login = localStorage.getItem('jwt');
  const [isLogin,setLogin]=useState(Login?true:false);

  return (
    // <LocalizationProvider>
    <BrowserRouter>
      <Navbar roleOfUser={roleOfUser} isLogin={isLogin} setLogin={setLogin}/>
      <Route exact path="/">
        <Fimage />
        <SearchFilter isLogin={isLogin} />
        <Textarea />
        <Map />
        <Footer />
      </Route>
      <Route path="/user/register">
        <Signup />
      </Route>
      <Route path="/user/login">
        <Signin setLogin={setLogin}/>
      </Route>
      <Route path="/user/addcollege">
        <AddCollege />
      </Route>
      <Route path="/dash/UIET">
        <CollegeDash />
      </Route>
      <Route path="/forbidden">
        <Forbidden />
      </Route>
      <Route path='/schedulemeet'>
        <ScheduleMeet/>
      </Route>
      <Route path ='/users/:id/verify/:token'>
        <EmailVerify/>
      </Route>
    </BrowserRouter>
    // </LocalizationProvider>
  );
}

export default App;
