import React from "react";
import {Link}from "react-router-dom";
function Navbar(){
    return(
    <nav>
    <div className="nav-wrapper ">
      <a href="/" className="left brand-logo"><img src = "./public/CD.png" alt=" "/></a>
      <ul id="nav-mobile" className="right ">
        <li><Link to="/user/login">Log In</Link></li>
        <li><Link to="/user/register">Sign Up</Link></li>
      </ul>
    </div>
    </nav>
    )
}
export default Navbar;