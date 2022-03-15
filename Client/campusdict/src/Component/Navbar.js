import React from "react";
function Navbar(){
    return(
    <nav>
    <div className="nav-wrapper ">
      <a href="#" className="left brand-logo"><img src = "./public/CD.png" alt=" "/></a>
      <ul id="nav-mobile" className="right ">
        <li><a href="sass.html">Sign In</a></li>
        <li><a href="badges.html">Sign Up</a></li>
      </ul>
    </div>
    </nav>
    )
}
export default Navbar;