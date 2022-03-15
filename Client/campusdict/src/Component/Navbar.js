import React from "react";

function Navbar(){
    return(
    <nav>
    <div className="nav-wrapper ">
      <a href="#" className="left brand-logo"><img  style = {{height : "72px"}} src = "./CD_L.png" alt=" "/></a>
      <ul id="nav-mobile" className="right ">
        <li><a href="sass.html">Sign In</a></li>
        <li><a href="badges.html">Sign Up</a></li>
      </ul>
    </div>
    </nav>
    )
}
export default Navbar;