import M from "materialize-css";
import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import BasicModal from "./LogOut";
function Navbar({ roleOfUser, isLogin, setLogin }) {
  const ref = useRef(null);
  const history = useHistory();
  const handleLogOut = () => {
    setLogin(false);
    localStorage.removeItem('jwt');
    history.push('/');
  }
  document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });
  return (
    <nav>
      <div className="nav-wrapper ">
        <a href="/" className="left brand-logo"><img style={{ height: "65px" }} src="./CD_L.png" alt=" " /></a>
        <ul id="nav-mobile" className="right" style={{ display: 'flex', justifyContent: 'space-around' }}>
          {!isLogin && <li><Link to="/user/login"><p style={{
            'fontSize': '1.2rem',
            'fontFamily': 'monospace'

          }}>Log In</p></Link></li>}
          {!isLogin && <li><Link to="/user/register"><p style={{
            'fontSize': '1.2rem',
            'fontFamily': 'monospace'
          }}>Sign Up</p></Link></li>}
          {!roleOfUser && isLogin && <li><Link to="/user/addcollege"><p style={{
            'fontSize': '1.2rem',
            'fontFamily': 'monospace'
          }}>Clg Registration</p></Link></li>}
          {isLogin && <BasicModal setLogin={setLogin} />}
        </ul>
      </div>
    </nav>
  )
}
export default Navbar;